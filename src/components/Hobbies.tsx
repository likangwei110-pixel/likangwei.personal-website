import { motion, AnimatePresence, Reorder } from 'motion/react';
import { useRef, useState, ChangeEvent } from 'react';
import { useApp } from '../AppContext';
import { MOVIES } from '../constants';
import { Film, Camera, Sparkles, ChevronLeft, ChevronRight, X, Maximize2, Plus, Image as ImageIcon, Edit2, GripVertical } from 'lucide-react';
import { Photo, Movie } from '../types';

export default function Hobbies() {
  const { t } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const movieFileInputRef = useRef<HTMLInputElement>(null);
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [memoirMovies, setMemoirMovies] = useState<Movie[]>(MOVIES);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [targetMovieIndex, setTargetMovieIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.4;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos: Photo[] = Array.from(files).map((file: File) => ({
        url: URL.createObjectURL(file),
        title: file.name.split('.')[0],
        location: 'Local Upload'
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleMovieFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && targetMovieIndex !== null) {
      const file = files[0];
      const newUrl = URL.createObjectURL(file);
      const updated = [...memoirMovies];
      updated[targetMovieIndex] = { ...updated[targetMovieIndex], image: newUrl };
      setMemoirMovies(updated);
      setTargetMovieIndex(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerMovieFileInput = (index: number) => {
    setTargetMovieIndex(index);
    movieFileInputRef.current?.click();
  };

  const updatePhotoTitle = (index: number, newTitle: string) => {
    const updated = [...photos];
    updated[index].title = newTitle;
    setPhotos(updated);
    setEditingId(null);
  };

  const updateMovieTitle = (index: number, newTitle: string) => {
    const updated = [...memoirMovies];
    updated[index] = { ...updated[index], title: newTitle };
    setMemoirMovies(updated);
    setEditingMovieId(null);
  };

  const updateMovieYear = (index: number, newYear: string) => {
    const updated = [...memoirMovies];
    updated[index] = { ...updated[index], year: parseInt(newYear) || 2000 };
    setMemoirMovies(updated);
    setEditingMovieId(null);
  };

  return (
    <section id="play" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      {/* Photography Section */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
                <Camera size={16} />
              </div>
              <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent">{t('镜头之外', 'Beyond Screens')}</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tight italic dark:text-white">
              {t('定格', 'Capturing')} <span className="text-brand-accent">{t('静止', 'stillness')}</span>.
            </h3>
          </div>
          <p className="text-brand-text/50 dark:text-white/40 max-w-sm text-sm font-medium">
            {t('个人摄影作品，记录逻辑、对称和氛围。拖拽可排序，点击可添加或重命名。', 'Personal photography documenting logic, symmetry, and atmosphere. Drag to reorder, click to add or rename.')}
          </p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange}
        />

        <div className="relative group/gallery">
          <Reorder.Group 
            axis="x" 
            values={photos} 
            onReorder={setPhotos}
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
          >
            {/* User Added Photos */}
            {photos.map((photo, i) => (
              <Reorder.Item 
                key={photo.url} 
                value={photo}
                layoutId={`photo-${i}`}
                className="min-w-[85vw] md:min-w-[45vw] aspect-[3/2] rounded-[40px] overflow-hidden snap-center relative shadow-xl cursor-grab active:cursor-grabbing group shrink-0"
              >
                <div 
                  className="absolute inset-0 z-0 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                
                {/* Drag Handle Overlay */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 p-2 rounded-xl glass opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <GripVertical size={20} className="text-brand-text/50" />
                </div>
                
                {/* Action Buttons */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                    className="p-4 rounded-full bg-brand-accent text-white shadow-xl hover:scale-110 transition-transform"
                    title="Add more"
                  >
                    <Plus size={24} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingId(i); }}
                    className="p-4 rounded-full bg-white text-brand-text shadow-xl hover:scale-110 transition-transform"
                    title="Rename photo"
                  >
                    <Edit2 size={24} />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{photo.location}</div>
                  
                  {editingId === i ? (
                    <div className="pointer-events-auto">
                      <input 
                        autoFocus
                        defaultValue={photo.title}
                        onBlur={(e) => updatePhotoTitle(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') updatePhotoTitle(i, (e.target as HTMLInputElement).value);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/20 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-2xl font-bold w-full outline-none focus:bg-white/30"
                      />
                    </div>
                  ) : (
                    <h4 className="text-2xl font-bold">{photo.title}</h4>
                  )}
                </div>
              </Reorder.Item>
            ))}

            {/* Empty Add Card */}
            {(photos.length === 0 || photos.length < 15) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={triggerFileInput}
                className="min-w-[85vw] md:min-w-[45vw] aspect-[3/2] rounded-[40px] bg-brand-accent/5 border-2 border-dashed border-brand-accent/20 hover:border-brand-accent hover:bg-brand-accent/10 transition-all flex flex-col items-center justify-center gap-6 cursor-pointer group snap-center shrink-0"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-110 transition-transform duration-500">
                   <Plus size={40} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl mb-1">Add Photo</p>
                  <p className="text-xs text-brand-text/40 font-medium uppercase tracking-widest leading-loose">Upload from your device</p>
                </div>
              </motion.div>
            )}
          </Reorder.Group>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between">
             <div className="flex gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="p-4 rounded-2xl glass hover:bg-brand-accent hover:text-white transition-all shadow-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="p-4 rounded-2xl glass hover:bg-brand-accent hover:text-white transition-all shadow-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
             </div>
            <div className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-brand-text/20 dark:text-white/10">
               {photos.length > 0 ? t('滑动或使用按钮导航', 'Swipe or use buttons to navigate') : t('开始添加你的第一张照片', 'Start by adding your first photo')}
             </div>
          </div>
        </div>
      </div>

      {/* Photo Modal/Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 bg-white/95 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full aspect-[3/2] md:aspect-[16/10] bg-white rounded-[40px] overflow-hidden shadow-2xl overflow-y-auto md:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/3 h-2/3 md:h-full bg-gray-100">
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/3 p-12 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent mb-6">About this shot</div>
                    <h4 className="text-4xl font-extrabold mb-4 tracking-tight">{selectedPhoto.title}</h4>
                    <div className="flex items-center gap-2 text-brand-text/50 font-semibold mb-8">
                      <Camera size={16} />
                      {selectedPhoto.location}
                    </div>
                    <p className="text-brand-text/70 leading-relaxed font-medium">
                      One of my personal favorites. Documented during a solo expedition, focusing on the interplay 
                      between natural lighting and architectural symmetry.
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-black/5">
                    <p className="text-[10px] font-bold text-brand-text/20 uppercase tracking-widest mb-4">Original Personal Photography</p>
                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="w-full py-4 rounded-2xl bg-brand-text text-white font-bold hover:bg-brand-accent transition-colors flex items-center justify-center gap-2"
                    >
                      Close <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-4 rounded-full glass hover:bg-brand-accent hover:text-white transition-all z-10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Movie Modal/Lightbox */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 bg-white/95 backdrop-blur-xl"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full aspect-[2/3] md:aspect-[16/9] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100">
                <img 
                  src={selectedMovie.image} 
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <div className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent mb-4">{selectedMovie.year} Memoir</div>
                <h4 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight leading-tight">{selectedMovie.title}</h4>
                <div className="text-lg font-bold text-brand-text/40 mb-8 italic">{selectedMovie.role}</div>
                
                <div className="space-y-8 max-h-[40vh] overflow-y-auto no-scrollbar">
                  {selectedMovie.description && (
                    <div>
                      <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-3 opacity-50">Synopsis / 简介</div>
                      <p className="text-lg font-medium leading-relaxed mb-4 text-brand-text/80">{selectedMovie.description}</p>
                      {selectedMovie.descriptionEn && (
                        <p className="text-sm text-brand-text/60 leading-relaxed font-medium italic">{selectedMovie.descriptionEn}</p>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="mt-12 px-8 py-4 rounded-full bg-brand-text text-white font-bold hover:bg-brand-accent transition-all self-start flex items-center gap-2 group"
                >
                  Close <X size={18} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
              
              <button 
                onClick={() => setSelectedMovie(null)}
                className="absolute top-6 right-6 p-4 rounded-full glass hover:bg-brand-accent hover:text-white transition-all z-10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinema / Zhang Ziyi Memoir */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
                <Film size={16} />
              </div>
              <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent">{t('AIGC 展示', 'AIGC Showcase')}</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tight dark:text-white">Zhang Ziyi <span className="text-brand-accent font-display font-medium">{t('精彩瞬间', 'Memoir')}</span>.</h3>
          </div>
          <a 
            href="https://likangwei110-pixel.github.io/zhangziyi-memoir/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pill bg-white dark:bg-zinc-900 border-brand-accent/20 hover:bg-brand-accent hover:text-white transition-all"
          >
            <Sparkles size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Live Experience</span>
          </a>
        </div>
        
        <input 
          type="file" 
          ref={movieFileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleMovieFileChange}
        />

        <div className="bg-white/50 dark:bg-zinc-950/50 border border-black/5 dark:border-white/5 rounded-[48px] p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {memoirMovies.map((movie, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col group relative"
              >
                <div 
                  className="aspect-[2/3] rounded-3xl overflow-hidden mb-6 shadow-md transition-shadow group-hover:shadow-2xl relative cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Upload Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); triggerMovieFileInput(i); }}
                      className="p-4 rounded-full bg-brand-accent text-white shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-auto"
                      title="Update movie poster"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1 relative z-10">
                  {editingMovieId === i ? (
                    <input 
                      autoFocus
                      className="text-[10px] font-extrabold text-brand-accent bg-transparent border-b border-brand-accent outline-none w-16"
                      defaultValue={movie.year}
                      onBlur={(e) => updateMovieYear(i, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && updateMovieYear(i, (e.target as HTMLInputElement).value)}
                    />
                  ) : (
                    <div className="text-[10px] font-extrabold text-brand-accent">{movie.year}</div>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingMovieId(editingMovieId === i ? null : i); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-brand-accent transition-colors"
                  >
                    <Edit2 size={12} className="text-brand-text/30" />
                  </button>
                </div>

                {editingMovieId === i ? (
                  <input 
                    autoFocus
                    className="text-lg font-bold bg-white/50 dark:bg-zinc-800/50 rounded px-2 py-1 outline-none border border-brand-accent/20 dark:text-white"
                    defaultValue={movie.title}
                    onBlur={(e) => updateMovieTitle(i, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && updateMovieTitle(i, (e.target as HTMLInputElement).value)}
                  />
                ) : (
                  <h5 
                    className="text-lg font-bold group-hover:text-brand-accent transition-colors cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    {movie.title}
                  </h5>
                )}
                
                <p 
                  className="text-xs opacity-40 font-medium cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  {movie.role}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 p-8 rounded-3xl bg-brand-accent/5 border border-brand-accent/10">
            <h6 className="text-sm font-bold mb-2">Technical Insight:</h6>
            <p className="text-xs text-brand-text/60 leading-relaxed max-w-2xl font-medium">
              This interactive timeline was prototyped using Stitch and Cursor, demonstrating how AI can accelerate 
              the delivery of complex UI logic and interactive storytelling. One PM, zero frontend bottlenecks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
