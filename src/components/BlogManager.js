// src/components/BlogManager.js
// Composant pour faciliter l'ajout et la gestion des articles de blog

import React, { useState } from 'react';
import { images } from '../data/data';

const BlogManager = () => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
    author: 'Votre Nom'
  });

  const [articles, setArticles] = useState(images.blog);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.content) {
      const article = {
        id: Date.now(),
        ...newArticle,
        date: new Date().toISOString().split('T')[0],
        tags: newArticle.tags.split(',').map(tag => tag.trim())
      };

      setArticles(prev => [article, ...prev]);
      
      // Réinitialiser le formulaire
      setNewArticle({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        tags: '',
        author: 'Votre Nom'
      });

      // Ici vous pourriez sauvegarder dans un fichier ou une base de données
      console.log('Nouvel article ajouté:', article);
      alert('Article ajouté avec succès! N\'oubliez pas de mettre à jour votre fichier data.js');
    }
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  const generateDataJsCode = () => {
    const articlesCode = articles.map(article => `    {
      id: ${article.id},
      title: '${article.title.replace(/'/g, "\\'")}',
      image: '${article.image}',
      excerpt: '${article.excerpt.replace(/'/g, "\\'")}',
      date: '${article.date}',
      author: '${article.author}',
      content: \`${article.content.replace(/`/g, '\\`')}\`,
      tags: [${Array.isArray(article.tags) ? article.tags.map(tag => `'${tag}'`).join(', ') : `'${article.tags}'`}]
    }`).join(',\n');

    return `// Copiez ce code dans votre fichier src/data/data.js pour mettre à jour les articles:
// Remplacez la section 'blog: [...]' par:
blog: [
${articlesCode}
]`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">🎨 Gestionnaire de Blog Kalligraphic</h2>
      
      {/* Formulaire d'ajout d'article */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">✍️ Ajouter un nouvel article</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Titre de l'article</label>
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: L'art de la calligraphie moderne"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image (chemin)</label>
            <input
              type="text"
              name="image"
              value={newArticle.image}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: /images/blog/article3.jpg"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Extrait (résumé)</label>
          <textarea
            name="excerpt"
            value={newArticle.excerpt}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Court résumé de l'article qui apparaîtra sur la page d'accueil..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Contenu complet</label>
          <textarea
            name="content"
            value={newArticle.content}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contenu complet de l'article avec formatage Markdown..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              value={newArticle.tags}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: calligraphie, moderne, technique"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Auteur</label>
            <input
              type="text"
              name="author"
              value={newArticle.author}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddArticle}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
        >
          ➕ Ajouter l'article
        </button>
      </div>

      {/* Liste des articles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Articles actuels ({articles.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                {article.image ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gray-200 items-center justify-center">
                      <span className="text-gray-500 text-sm">Image non trouvée</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Aucune image</div>
                )}
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>📅 {article.date}</div>
                <div>👤 {article.author}</div>
                <div>🏷️ {Array.isArray(article.tags) ? article.tags.join(', ') : article.tags}</div>
              </div>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
              >
                🗑️ Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Code généré */}
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-green-400">💻 Code à copier dans data.js</h3>
        <div className="bg-gray-800 p-4 rounded border">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300">
            {generateDataJsCode()}
          </pre>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(generateDataJsCode())}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-semibold"
          >
            📋 Copier le code
          </button>
          <button
            onClick={() => {
              const blob = new Blob([generateDataJsCode()], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'blog-update.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
          >
            💾 Télécharger
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>📝 Instructions :</strong> Après avoir ajouté vos articles, copiez le code généré et remplacez la section 'blog: [...]' dans votre fichier <code>src/data/data.js</code>. N'oubliez pas d'ajouter les images correspondantes dans le dossier <code>public/images/blog/</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;