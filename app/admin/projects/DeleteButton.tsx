// app/admin/projects/DeleteButton.tsx
'use client'; // ضروري جداً

import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { deleteProject } from '../actions'; // تأكد أن مسار استيراد الأكشن صحيح

interface DeleteButtonProps {
  id: string;
  imageUrl: string;
}

export default function DeleteButton({ id, imageUrl }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    // 1. إظهار رسالة التأكيد
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "سيتم حذف المشروع والصورة المرتبطة به نهائياً!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      background: '#1e293b', // لون خلفية داكن ليناسب تصميمك
      color: '#fff' // لون النص أبيض
    });

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        // 2. تجهيز البيانات كما يتوقعها السيرفر (FormData)
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image_url', imageUrl);

        // 3. استدعاء دالة الحذف
        await deleteProject(formData);

        // 4. رسالة النجاح
        Swal.fire({
          title: 'تم الحذف!',
          text: 'لقد تم حذف المشروع بنجاح.',
          icon: 'success',
          background: '#1e293b',
          color: '#fff'
        });
        
      } catch (error) {
        Swal.fire({
          title: 'خطأ',
          text: 'حدثت مشكلة أثناء الحذف',
          icon: 'error',
          background: '#1e293b',
          color: '#fff'
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isDeleting}
      className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition disabled:opacity-50"
    >
      {isDeleting ? (
        <span className="animate-pulse">جاري الحذف...</span>
      ) : (
        <>
          <FaTrash size={14} />
          <span>حذف</span>
        </>
      )}
    </button>
  );
}