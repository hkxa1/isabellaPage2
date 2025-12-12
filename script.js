document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos y Variables
    const slides = document.querySelectorAll('.slide');
    const controlsContainer = document.querySelector('.controls-container');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const startBtn = document.getElementById('startBtn');
    
    // Capturar el elemento de audio
    const finalAudio = document.getElementById('finalAudio'); 
    
    let currentSlide = 0;

    // 2. Funciones de Control de Slides

    function showSlide(index) {
        if (index < 0 || index >= slides.length) {
            return;
        }

        /*
         * CÓDIGO ELIMINADO: Anteriormente aquí se pausaba y reiniciaba el audio 
         * al salir del último slide. Ahora lo dejamos sonar.
         */

        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.querySelectorAll('.animated').forEach(el => {
                el.classList.remove('animate-in');
            });
        });

        const currentSlideElement = slides[index];
        currentSlideElement.classList.add('active');
        currentSlide = index;
        
        activateAnimations(currentSlideElement);
        
        updateButtons();
    }

    function updateButtons() {
        // Lógica: Ocultar/Mostrar el contenedor de controles
        if (currentSlide === 0) {
            controlsContainer.classList.add('hidden');
        } else {
            controlsContainer.classList.remove('hidden');
            prevBtn.disabled = currentSlide === 0;
        }
        
        // Lógica del botón de Siguiente: Simplificado para el cierre
        if (currentSlide === slides.length - 1) {
             // En el último slide, se deshabilita y se da un mensaje final
             nextBtn.textContent = 'Fin de la Experiencia 🎉';
             nextBtn.disabled = true;
             
             /*
              * CÓDIGO ELIMINADO: Anteriormente aquí se pausaba y reiniciaba el audio 
              * al llegar al último slide. Ahora lo dejamos sonar.
              */
             
        } else {
             // En cualquier otro slide
             nextBtn.textContent = 'Siguiente →';
             nextBtn.disabled = false;
        }
    }

    function activateAnimations(slideElement) {
        const animatedElements = slideElement.querySelectorAll('.animated');
        
        animatedElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, 200 * i);
        });
    }

    // 3. Event Listeners
    
    // LISTENER MODIFICADO: Reproduce el audio y avanza el slide
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            
            // 1. REPRODUCIR EL AUDIO AL HACER CLIC
            if (finalAudio) {
                // Intentamos reproducir sin mostrar alertas molestas.
                finalAudio.play().catch(error => {
                    console.error("Audio playback attempted but failed silently:", error);
                });
            }
            
            // 2. AVANZAR AL SEGUNDO SLIDE
            showSlide(currentSlide + 1); 
        });
    }

    // LISTENER NORMAL DE NAVEGACIÓN
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });

    // 4. Inicialización
    showSlide(0);
});