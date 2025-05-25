// src/pages/AdminPage.js
// Page d'administration pour gérer le contenu du site

import React, { useState } from 'react';
import BlogManager from '../components/BlogManager';
import PortfolioManager from '../components/PortfolioManager';
import Login from '../components/Login';
import AuthProvider, { useAuth } from '../components/AuthProvider';
import { images, siteContent } from '../data/data';

const AdminPageContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAuth();

  const tabs = [
    { id: 'dashboard', name: '🏠 Tableau de bord', icon: '📊' },
    { id: 'images', name: '🖼️ Gestion Images', icon: '🎨' },
    { id: 'blog', name: '📝 Gestion Blog', icon: '✍️' },
    { id: 'portfolio', name: '🎨 Gestion Portfolio', icon: '🖼️' },
    { id: 'content', name: '📄 Contenu Site', icon: '📝' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">🎨 Bienvenue dans l'administration Kalligraphic</h2>
        <p className="text-blue-100">Gérez facilement le contenu de votre site de calligraphie</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📝</div>
            <div>
              <p className="text-sm text-gray-600">Articles de blog</p>
              <p className="text-xl font-bold">{images.blog.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎨</div>
            <div>
              <p className="text-sm text-gray-600">Projets portfolio</p>
              <p className="text-xl font-bold">{images.portfolioPreview.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🖼️</div>
            <div>
              <p className="text-sm text-gray-600">Images hero</p>
              <p className="text-xl font-bold">{images.hero.gallery.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="text-2xl mr-3">⚙️</div>
            <div>
              <p className="text-sm text-gray-600">Services</p>
              <p className="text-xl font-bold">{siteContent.services.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🚀 Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('blog')}
            className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="text-2xl mb-2">✍️</div>
            <div className="font-medium">Ajouter un article</div>
            <div className="text-sm text-gray-600">Créer un nouveau post de blog</div>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-medium">Ajouter un projet</div>
            <div className="text-sm text-gray-600">Nouveau projet portfolio</div>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="text-2xl mb-2">🖼️</div>
            <div className="font-medium">Gérer les images</div>
            <div className="text-sm text-gray-600">Organisation des images</div>
          </button>
        </div>
      </div>

      {/* Guide d'utilisation */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">📚 Guide d'utilisation</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>1. Gestion des images :</strong> Organisez vos images dans les dossiers appropriés</p>
          <p><strong>2. Blog :</strong> Ajoutez facilement de nouveaux articles avec images</p>
          <p><strong>3. Portfolio :</strong> Gérez vos projets et créations</p>
          <p><strong>4. Mise à jour :</strong> Copiez le code généré dans votre fichier data.js</p>
        </div>
      </div>
    </div>
  );

  const renderImageManagement = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">🖼️ Structure des Images</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">📁 Organisation recommandée :</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-line">
{`public/images/
├── hero-image.png (image principale)
├── hero-image1.png à hero-image6.png (galerie)
├── 45.png (photo de profil)
├── logo.png
├── about/ (images section À propos)
├── portfolio/ (images des projets)
│   ├── projet1/
│   │   ├── main.jpg
│   │   ├── detail1.jpg
│   │   └── detail2.jpg
│   └── projet2/
└── blog/ (images articles)`}
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images actuelles */}
          <div>
            <h3 className="font-semibold mb-3">🖼️ Images Hero actuelles</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">🏠 Image principale:</span>
                <code className="ml-2 text-xs bg-blue-100 px-2 py-1 rounded">{images.hero.main}</code>
              </div>
              {images.hero.gallery.map((img, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">🖼️ Galerie {index + 1}:</span>
                  <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{img}</code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">👤 Images À propos</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 bg-green-50 rounded">
                <span className="text-sm">👤 Profil:</span>
                <code className="ml-2 text-xs bg-green-100 px-2 py-1 rounded">{images.about.profile}</code>
              </div>
              <div className="flex items-center p-2 bg-green-50 rounded">
                <span className="text-sm">🖼️ Arrière-plan:</span>
                <code className="ml-2 text-xs bg-green-100 px-2 py-1 rounded">{images.about.background}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Conseils pour les images</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Format :</strong> JPG pour photos, PNG pour logos/transparence</li>
            <li>• <strong>Taille :</strong> Hero 1920x1080px, Portfolio 800x600px, Blog 600x400px</li>
            <li>• <strong>Optimisation :</strong> Compressez avant d'ajouter pour de meilleures performances</li>
            <li>• <strong>Nommage :</strong> Utilisez des noms descriptifs sans espaces ni caractères spéciaux</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">📄 Gestion du Contenu</h2>
        
        {/* Informations du site */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">ℹ️ Informations générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Titre du site</label>
                <p className="text-gray-900">{siteContent.site.title}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{siteContent.site.description}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Auteur</label>
                <p className="text-gray-900">{siteContent.site.author}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{siteContent.site.email}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Téléphone</label>
                <p className="text-gray-900">{siteContent.site.phone}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <label className="text-sm font-medium text-gray-700">Adresse</label>
                <p className="text-gray-900">{siteContent.site.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Hero */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🏠 Section Hero (Page d'accueil)</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded">
              <label className="text-sm font-medium text-gray-700">Titre principal</label>
              <p className="text-gray-900 text-lg font-bold">{siteContent.hero.title}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <label className="text-sm font-medium text-gray-700">Sous-titre</label>
              <p className="text-gray-900">{siteContent.hero.subtitle}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-gray-900">{siteContent.hero.description}</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">⚙️ Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {siteContent.services.map((service, index) => (
              <div key={service.id} className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">{service.icon}</div>
                <h4 className="font-semibold">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-700">
            <strong>📝 Note :</strong> Pour modifier ces contenus, éditez directement le fichier <code>src/data/data.js</code> dans la section <code>siteContent</code>.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">🎨 Administration Kalligraphic</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Gestion de contenu
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                title="Se déconnecter"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-4 sm:px-6 lg:px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'images' && renderImageManagement()}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'portfolio' && <PortfolioManager />}
        {activeTab === 'content' && renderContentManagement()}
      </div>
    </div>
  );
};

// Composant principal avec authentification
const AdminPage = () => {
  return (
    <AuthProvider>
      <AdminPageWithAuth />
    </AuthProvider>
  );
};

// Composant qui gère l'affichage selon l'état d'authentification
const AdminPageWithAuth = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <AdminPageContent />;
};

export default AdminPage;