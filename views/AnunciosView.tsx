
import React, { useState, useCallback } from 'react';
import { Anuncio } from '../types';
import Modal from '../components/Modal';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { generateAnnouncement, AnnouncementResponse } from '../services/geminiService';
import { initialAnuncios } from '../data/mockData';

const AnunciosView: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>(initialAnuncios);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [newAnuncio, setNewAnuncio] = useState<{ titulo: string; contenido: string }>({ titulo: '', contenido: '' });
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAnuncio(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnuncio.titulo && newAnuncio.contenido) {
      const nuevo: Anuncio = {
        id: crypto.randomUUID(),
        ...newAnuncio,
        fecha: new Date().toISOString().split('T')[0]
      };
      setAnuncios([nuevo, ...anuncios]);
      setIsModalOpen(false);
      setNewAnuncio({ titulo: '', contenido: '' });
    }
  };

  const handleGenerateWithAI = useCallback(async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const result: AnnouncementResponse | null = await generateAnnouncement(aiPrompt);
    if (result) {
        setNewAnuncio({ titulo: result.titulo, contenido: result.contenido.replace(/\\n/g, '\n') });
        setIsAiModalOpen(false);
        setAiPrompt('');
    }
    setIsGenerating(false);
  }, [aiPrompt]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-800">Cartelera Informativa</h1>
            <p className="text-slate-500">Comunícate de forma efectiva con todos los residentes.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5"/>
          <span>Crear Anuncio</span>
        </button>
      </div>

      <div className="space-y-6">
        {anuncios.map(anuncio => (
          <div key={anuncio.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-slate-800">{anuncio.titulo}</h2>
            <p className="text-sm text-slate-400 mb-4">Publicado el: {new Date(anuncio.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-slate-600 whitespace-pre-wrap">{anuncio.contenido}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nuevo Anuncio">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-sm font-medium text-slate-700 mb-1">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={newAnuncio.titulo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contenido" className="block text-sm font-medium text-slate-700 mb-1">Contenido</label>
            <textarea
              id="contenido"
              name="contenido"
              value={newAnuncio.contenido}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="bg-amber-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:bg-slate-300"
                disabled={isGenerating}
            >
                <SparklesIcon className="w-5 h-5"/>
                <span>Generar con IA</span>
            </button>
            <div className="flex gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200">
                    Cancelar
                </button>
                <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                    Publicar
                </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="Generar Anuncio con IA">
          <div>
            <p className="text-slate-600 mb-4">Describe la idea principal del anuncio y la IA creará un borrador profesional para ti.</p>
             <div className="mb-4">
                <label htmlFor="ai-prompt" className="block text-sm font-medium text-slate-700 mb-1">Idea del anuncio</label>
                <textarea
                    id="ai-prompt"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ej: Recordar a los residentes sobre el mantenimiento del ascensor el viernes a las 10am."
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleGenerateWithAI}
                    disabled={isGenerating || !aiPrompt}
                    className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isGenerating ? 'Generando...' : 'Generar Borrador'}
                </button>
            </div>
          </div>
      </Modal>

    </div>
  );
};

export default AnunciosView;