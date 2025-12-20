// app/admin/projects/actions.ts
'use server'; // 👈 هذا يخبر Next.js أن هذه دالة تعمل على السيرفر

import { revalidatePath } from 'next/cache';
// import { db } from '@/lib/db'; // مثال لاستيراد قاعدة البيانات

export async function deleteProjectAction(id: string) {
  try {
    // هنا ضع كود الحذف الخاص بقاعدة بياناتك
    // مثال: await db.project.delete({ where: { id } });
    console.log(`Deleting project with id: ${id}`);

    // تحديث الصفحة تلقائياً بعد الحذف
    revalidatePath('/admin/projects'); 
  } catch (error) {
    throw new Error('Failed to delete project');
  }
}