'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Loader2,
  Save,
  ImagePlus,
} from 'lucide-react'
import type { Project, ProjectCategory } from '@/lib/types'
import { PROJECT_CATEGORIES } from '@/lib/types'

interface Props {
  initialProjects: Project[]
}

interface ProjectForm {
  title: string
  description: string
  category: string
  date: string
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  category: 'Building',
  date: new Date().toISOString().split('T')[0],
}

export default function PortfolioManager({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectForm>(emptyForm)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...uploadedFiles, ...acceptedFiles]
    setUploadedFiles(newFiles)
    const previews = newFiles.map((f) => URL.createObjectURL(f))
    setUploadPreviews(previews)
  }, [uploadedFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const openNewForm = () => {
    setForm(emptyForm)
    setUploadedFiles([])
    setUploadPreviews([])
    setExistingImages([])
    setEditingProject(null)
    setShowForm(true)
  }

  const openEditForm = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description || '',
      category: project.category,
      date: project.date || new Date().toISOString().split('T')[0],
    })
    setExistingImages(project.image_urls || [])
    setUploadedFiles([])
    setUploadPreviews([])
    setEditingProject(project)
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingProject(null)
    uploadPreviews.forEach((p) => URL.revokeObjectURL(p))
    setUploadPreviews([])
    setUploadedFiles([])
  }

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(uploadPreviews[index])
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    const newPreviews = uploadPreviews.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setUploadPreviews(newPreviews)
  }

  const removeExistingImage = (url: string) => {
    setExistingImages(existingImages.filter((u) => u !== url))
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const supabase = createClient()
    const urls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split('.').pop()
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('project-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })
      if (error) throw new Error(`Upload failed: ${error.message}`)
      const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(path)
      urls.push(urlData.publicUrl)
      setUploadProgress(Math.round(((i + 1) / files.length) * 100))
    }
    return urls
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error('Project title is required')
      return
    }
    setSaving(true)
    setUploadProgress(0)

    try {
      const supabase = createClient()
      let newImageUrls: string[] = []

      if (uploadedFiles.length > 0) {
        newImageUrls = await uploadImages(uploadedFiles)
      }

      const allImageUrls = [...existingImages, ...newImageUrls]

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: form.title,
            description: form.description || null,
            category: form.category,
            date: form.date || null,
            image_urls: allImageUrls,
          })
          .eq('id', editingProject.id)

        if (error) throw error

        setProjects(
          projects.map((p) =>
            p.id === editingProject.id
              ? { ...p, ...form, image_urls: allImageUrls }
              : p
          )
        )
        toast.success('Project updated!')
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            title: form.title,
            description: form.description || null,
            category: form.category,
            date: form.date || null,
            image_urls: allImageUrls,
          })
          .select()
          .single()

        if (error) throw error
        setProjects([data, ...projects])
        toast.success('Project added!')
      }

      cancelForm()
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : JSON.stringify(err)
      toast.error(msg)
    } finally {
      setSaving(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', project.id)
    if (error) {
      toast.error('Failed to delete project')
    } else {
      setProjects(projects.filter((p) => p.id !== project.id))
      toast.success('Project deleted')
    }
  }

  return (
    <div>
      {/* Add button */}
      {!showForm && (
        <div className='flex justify-end mb-6'>
          <button
            onClick={openNewForm}
            className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90'
            style={{ backgroundColor: '#F97316' }}
          >
            <Plus className='w-4 h-4' /> Add Project
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='font-bold text-lg text-gray-900'>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={cancelForm}
              className='p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                Project Title <span className='text-red-400'>*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder='e.g. Bathroom Renovation – Bellville'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-white'
              >
                {PROJECT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Date</label>
            <input
              type='date'
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className='w-full sm:w-48 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
            />
          </div>

          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder='Brief description of the project...'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none'
            />
          </div>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div className='mb-5'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Current Photos
              </label>
              <div className='flex flex-wrap gap-3'>
                {existingImages.map((url) => (
                  <div key={url} className='relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200'>
                    <Image src={url} alt='Project photo' fill className='object-cover' sizes='80px' />
                    <button
                      onClick={() => removeExistingImage(url)}
                      className='absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dropzone */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <ImagePlus className='inline w-4 h-4 mr-1' />
              {editingProject ? 'Add More Photos' : 'Upload Photos'}
            </label>
            <div
              {...getRootProps()}
              className='border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all'
              style={{
                borderColor: isDragActive ? '#F97316' : '#E5E7EB',
                backgroundColor: isDragActive ? 'rgba(249,115,22,0.04)' : '#FAFAFA',
              }}
            >
              <input {...getInputProps()} />
              <Upload className='w-8 h-8 text-gray-300 mx-auto mb-2' />
              <p className='text-sm text-gray-500'>
                {isDragActive
                  ? 'Drop photos here...'
                  : 'Drag & drop photos here, or click to browse'}
              </p>
              <p className='text-xs text-gray-400 mt-1'>JPG, PNG up to 10MB each</p>
            </div>

            {uploadPreviews.length > 0 && (
              <div className='flex flex-wrap gap-3 mt-4'>
                {uploadPreviews.map((preview, i) => (
                  <div key={preview} className='relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200'>
                    <Image src={preview} alt={`Upload preview ${i + 1}`} fill className='object-cover' sizes='80px' />
                    <button
                      onClick={() => removeNewFile(i)}
                      className='absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Progress bar */}
            {saving && uploadProgress > 0 && uploadProgress < 100 && (
              <div className='mt-4'>
                <div className='flex justify-between text-xs text-gray-500 mb-1'>
                  <span>Uploading photos...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className='w-full bg-gray-100 rounded-full h-2'>
                  <div
                    className='h-2 rounded-full transition-all duration-300'
                    style={{ width: `${uploadProgress}%`, backgroundColor: '#F97316' }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='flex gap-3'>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className='flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-60'
              style={{ backgroundColor: '#F97316' }}
            >
              {saving ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
              {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
            </button>
            <button
              onClick={cancelForm}
              disabled={saving}
              className='px-5 py-2.5 rounded-xl text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition'
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 text-gray-400'>
          <ImagePlus className='w-10 h-10 mx-auto mb-3 text-gray-300' />
          <p className='font-medium'>No projects yet</p>
          <p className='text-sm mt-1'>Add your first project to showcase your work.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
            >
              <div className='relative h-44 bg-gray-100'>
                {project.image_urls && project.image_urls[0] ? (
                  <Image
                    src={project.image_urls[0]}
                    alt={project.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-gray-300'>
                    <ImagePlus className='w-8 h-8' />
                  </div>
                )}
                <div
                  className='absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white'
                  style={{ backgroundColor: '#F97316' }}
                >
                  {project.category}
                </div>
                <div className='absolute top-2 right-2 text-xs text-white bg-black/40 rounded px-1.5 py-0.5'>
                  {project.image_urls?.length || 0} photos
                </div>
              </div>

              <div className='p-4'>
                <h3 className='font-bold text-gray-900 text-sm line-clamp-1'>{project.title}</h3>
                {project.date && (
                  <p className='text-xs text-gray-400 mt-0.5'>
                    {new Date(project.date).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                <div className='flex gap-2 mt-3'>
                  <button
                    onClick={() => openEditForm(project)}
                    className='flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition'
                  >
                    <Edit3 className='w-3.5 h-3.5' /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className='flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-100 hover:bg-red-50 transition'
                  >
                    <Trash2 className='w-3.5 h-3.5' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
