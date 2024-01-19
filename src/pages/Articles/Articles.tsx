import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Добавьте стили Quill напрямую в ваш компонент
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const Article: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdArticle, setCreatedArticle] = useState<any>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Log the article data to the console
        console.log('Created Article:', {title, content});

        // If you want to clear the form after logging, you can reset the state
        setTitle('');
        setContent('');
    };

    const quillModules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'align': []}],
            ['link', 'image'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['clean']
        ],
    };

    return (
        <div className="page-space">
            <h2>Создать новую статью</h2>
            <form onSubmit={handleSubmit}>

                Заголовок:
                <input type="text" value={title} onChange={handleTitleChange}/>

                Содержание:
                <ReactQuill modules={quillModules} value={content} onChange={handleContentChange}/>

                <button type="submit">Создать статью</button>
            </form>
        </div>
    );
};

export default Article;