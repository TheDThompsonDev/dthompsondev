import { prisma } from './prisma';

export async function queryBlogPosts(status?: string) {
  try {
    const where = status ? { status } : {};
    
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        components: true
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

export async function getBlogPost(id: number) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        components: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });
    
    return post;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string, includeUnpublished = false) {
  try {
    const where = includeUnpublished
      ? { slug }
      : { slug, status: 'published' };
    
    const post = await prisma.blogPost.findFirst({
      where,
      include: {
        components: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });
    
    return post;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

export async function createBlogPost(data: {
  slug: string;
  title: string;
  excerpt?: string;
  content: any;
  category?: string;
  featured?: boolean;
  read_time?: string;
  cover_image_url?: string;
}) {
  try {
    const post = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content || { blocks: [] },
        category: data.category,
        featured: data.featured || false,
        readTime: data.read_time,
        coverImageUrl: data.cover_image_url,
        status: 'draft'
      }
    });
    
    return post;
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}

export async function updateBlogPost(id: number, data: {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: any;
  category?: string;
  featured?: boolean;
  status?: string;
  read_time?: string;
  cover_image_url?: string;
}) {
  try {
    const updateData: any = {};
    
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.read_time !== undefined) updateData.readTime = data.read_time;
    if (data.cover_image_url !== undefined) updateData.coverImageUrl = data.cover_image_url;
    
    if (data.status !== undefined) {
      updateData.status = data.status;
      if (data.status === 'published') {
        updateData.publishedAt = new Date();
      }
    }
    
    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData
    });
    
    return post;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: number) {
  try {
    await prisma.blogPost.delete({
      where: { id }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export async function saveUploadedFile(data: {
  file_name: string;
  blob_url: string;
  file_type?: string;
  file_size?: number;
}) {
  try {
    const file = await prisma.uploadedFile.create({
      data: {
        fileName: data.file_name,
        blobUrl: data.blob_url,
        fileType: data.file_type,
        fileSize: data.file_size
      }
    });
    
    return file;
  } catch (error) {
    console.error('Save file error:', error);
    throw error;
  }
}

export async function getUploadedFiles() {
  try {
    const files = await prisma.uploadedFile.findMany({
      orderBy: { uploadedAt: 'desc' }
    });
    
    return files;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

export async function deleteUploadedFile(id: number) {
  try {
    await prisma.uploadedFile.delete({
      where: { id }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}