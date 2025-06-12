
// import React, { useEffect } from 'react';
// import './bookform.css';
// import {
//   TextField,
//   MenuItem,
//   Button,
// } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   getBook,
//   addBook,
//   updateBook,
// } from '../services/bookservice';
// import { toast } from 'react-toastify';

// const genres = ['Fiction', 'Non-Fiction', 'Science', 'History'];
// const statuses = ['Available', 'Issued'];

// function BookForm() {
//   const { id } = useParams();
//   const isEditMode = Boolean(id);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//  useEffect(() => {
//   if (isEditMode) {
//     const book = getBook(id);
//     if (book) {
//       setValue('title', book.title || '');
//       setValue('author', book.author || '');
//       setValue('genre', book.genre || '');
//       setValue('publishedYear', book.publishedYear || '');
//       setValue('status', book.status || '');
//     }
//   }
// }, [id, isEditMode, setValue]);

//   const onSubmit = (data) => {
//     if (isEditMode) {
//       updateBook(id, data);
//     } else {
//       addBook(data);
//     }
//     toast.success(`Book ${isEditMode ? 'updated' : 'added'} successfully`);
//     navigate('/');
//   };

//   return (
//     <div className="bookform-container">
//       <div className="bookform-paper">
//         <h2 className="bookform-title">
//           {isEditMode ? 'Edit Book' : 'Add New Book'}
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="bookform-form">
//           <div className="bookform-grid">
//             <div className="bookform-field">
//               <TextField
//                 label="Title"
//                 fullWidth
//                 {...register('title', { required: 'Title is required' })}
//                 error={!!errors.title}
//                 helperText={errors.title?.message}
//               />
//             </div>

//             <div className="bookform-field">
//               <TextField
//                 label="Author"
//                 fullWidth
//                 {...register('author', { required: 'Author is required' })}
//                 error={!!errors.author}
//                 helperText={errors.author?.message}
//               />
//             </div>

//             <div className="bookform-half-field">
//               <TextField
//                 label="Genre"
//                 fullWidth
//                 select
//                 {...register('genre', { required: 'Genre is required' })}
//                 error={!!errors.genre}
//                 helperText={errors.genre?.message}
//               >
//                 {genres.map((genre) => (
//                   <MenuItem key={genre} value={genre}>
//                     {genre}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </div>

//             <div className="bookform-half-field">
//               <TextField
//                 label="Published Year"
//                 fullWidth
//                 type="number"
//                 {...register('publishedYear', {
//                   required: 'Year is required',
//                   min: { value: 1000, message: 'Enter valid year' },
//                   max: {
//                     value: new Date().getFullYear(),
//                     message: 'Enter valid year',
//                   },
//                 })}
//                 error={!!errors.publishedYear}
//                 helperText={errors.publishedYear?.message}
//               />
//             </div>

//             <div className="bookform-field">
//               <TextField
//                 label="Status"
//                 fullWidth
//                 select
//                 {...register('status', { required: 'Status is required' })}
//                 error={!!errors.status}
//                 helperText={errors.status?.message}
//               >
//                 {statuses.map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </div>

//             <div className="bookform-button">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitting}
//                 fullWidth
//               >
//                 {isEditMode ? 'Update Book' : 'Add Book'}
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookForm;


import React, { useEffect } from 'react';
import './bookform.css';
import {
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getBook,
  addBook,
  updateBook,
} from '../services/bookservice';
import { toast } from 'react-toastify';

const genres = ['Fiction', 'Non-Fiction', 'Science', 'History'];
const statuses = ['Available', 'Issued'];

function BookForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: '',
      status: '',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const book = getBook(id);
      if (book) {
        setValue('title', book.title || '');
        setValue('author', book.author || '');
        setValue('genre', genres.includes(book.genre) ? book.genre : '');
        setValue('publishedYear', book.publishedYear || '');
        setValue('status', statuses.includes(book.status) ? book.status : '');
      }
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      updateBook(id, data);
    } else {
      addBook(data);
    }
    toast.success(`Book ${isEditMode ? 'updated' : 'added'} successfully`);
    navigate('/');
  };

  return (
    <div className="bookform-container">
      <div className="bookform-paper">
        <h2 className="bookform-title">
          {isEditMode ? 'Edit Book' : 'Add New Book'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="bookform-form">
          <div className="bookform-grid">
            <div className="bookform-field">
              <TextField
                label="Title"
                fullWidth
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </div>

            <div className="bookform-field">
              <TextField
                label="Author"
                fullWidth
                {...register('author', { required: 'Author is required' })}
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </div>

            <div className="bookform-half-field">
              <TextField
                label="Genre"
                fullWidth
                select
                defaultValue=""
                {...register('genre', { required: 'Genre is required' })}
                error={!!errors.genre}
                helperText={errors.genre?.message}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="bookform-half-field">
              <TextField
                label="Published Year"
                fullWidth
                type="number"
                {...register('publishedYear', {
                  required: 'Year is required',
                  min: { value: 1000, message: 'Enter valid year' },
                  max: {
                    value: new Date().getFullYear(),
                    message: 'Enter valid year',
                  },
                })}
                error={!!errors.publishedYear}
                helperText={errors.publishedYear?.message}
              />
            </div>

            <div className="bookform-field">
              <TextField
                label="Status"
                fullWidth
                select
                defaultValue=""
                {...register('status', { required: 'Status is required' })}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="bookform-button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isEditMode ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;

