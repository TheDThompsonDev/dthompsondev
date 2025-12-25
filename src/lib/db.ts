import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export interface BlogPostCreateInput {
  slug: string;
  title: string;
  excerpt?: string;
  content: Prisma.JsonValue;
  category?: string;
  featured?: boolean;
  readTime?: string;
  coverImageUrl?: string;
}

export interface BlogPostUpdateInput {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: Prisma.JsonValue;
  category?: string;
  featured?: boolean;
  status?: string;
  readTime?: string;
  coverImageUrl?: string;
}

export interface UploadedFileInput {
  fileName: string;
  blobUrl: string;
  fileType?: string;
  fileSize?: number;
}

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

export async function createBlogPost(data: BlogPostCreateInput) {
  try {
    const post = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content || { blocks: [] },
        category: data.category,
        featured: data.featured || false,
        readTime: data.readTime,
        coverImageUrl: data.coverImageUrl,
        status: 'draft'
      }
    });

    return post;
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}

export async function updateBlogPost(id: number, data: BlogPostUpdateInput) {
  try {
    const updateData: Prisma.BlogPostUpdateInput = {};

    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined && data.content !== null) updateData.content = data.content as Prisma.InputJsonValue;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.readTime !== undefined) updateData.readTime = data.readTime;
    if (data.coverImageUrl !== undefined) updateData.coverImageUrl = data.coverImageUrl;

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

export async function saveUploadedFile(data: UploadedFileInput) {
  try {
    const file = await prisma.uploadedFile.create({
      data: {
        fileName: data.fileName,
        blobUrl: data.blobUrl,
        fileType: data.fileType,
        fileSize: data.fileSize
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