// ============================================================
// VARIABLES GLOBALES
// ============================================================
let mainImage = document.getElementById('main-image');
let imageDescription = document.getElementById('image-description');
let thumbnails = document.querySelectorAll('.thumbnail');
// Actualiza estas variables en tu archivo script.js
let defaultImage = 'imagenes/deportiva1.jpg';
let defaultText = 'Selecciona una motocicleta de las miniaturas';

// ============================================================
// FUNCIÓN PARA AGREGAR TABINDEX (Requerido por JavaScript)
// ============================================================
function addTabIndex() {
    console.log('=== Agregando tabindex a las miniaturas ===');
    
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].setAttribute('tabindex', '0');
        thumbnails[i].setAttribute('role', 'button');
        console.log(`Tabindex agregado a miniatura ${i + 1}`);
    }
    
    console.log(`Total de miniaturas procesadas: ${thumbnails.length}`);
    console.log('============================================\n');
}

// ============================================================
// FUNCIÓN PARA ACTUALIZAR LA IMAGEN GRANDE
// ============================================================
function updateMainImage(thumbnail) {
    const img = thumbnail.querySelector('img');
    const figcaption = thumbnail.querySelector('figcaption');
    
    const altText = img ? img.getAttribute('alt') : 'Imagen sin descripción';
    const imgSrc = img ? img.getAttribute('src') : defaultImage;
    const captionText = figcaption ? figcaption.textContent : '';
    
    mainImage.setAttribute('src', imgSrc);
    mainImage.setAttribute('alt', altText);
    imageDescription.textContent = altText;
    
    document.getElementById('main-image-wrapper').style.backgroundImage = `url(${imgSrc})`;
    document.getElementById('main-image-wrapper').style.backgroundSize = 'cover';
    document.getElementById('main-image-wrapper').style.backgroundPosition = 'center';
    
    console.log(`✅ Moto actualizada: ${captionText || altText}`);
}

// ============================================================
// FUNCIÓN PARA RESTAURAR EL ESTADO ORIGINAL
// ============================================================
function restoreOriginalState() {
    console.log('🔄 Restaurando estado original...');
    
    mainImage.setAttribute('src', defaultImage);
    mainImage.setAttribute('alt', defaultText);
    imageDescription.textContent = defaultText;
    
    document.getElementById('main-image-wrapper').style.backgroundImage = 'url()';
    document.getElementById('main-image-wrapper').style.backgroundSize = '';
    document.getElementById('main-image-wrapper').style.backgroundPosition = '';
    
    thumbnails.forEach(t => t.classList.remove('active'));
    
    console.log('✅ Estado original restaurado');
}

// ============================================================
// EVENTOS DEL MOUSE: mouseover y mouseleave
// ============================================================
function handleMouseOver(event) {
    const thumbnail = event.currentTarget;
    console.log(`🖱️ Mouse sobre: ${thumbnail.id}`);
    
    updateMainImage(thumbnail);
    thumbnail.classList.add('active');
}

function handleMouseLeave(event) {
    const thumbnail = event.currentTarget;
    console.log(`🖱️ Mouse fuera: ${thumbnail.id}`);
    
    restoreOriginalState();
    thumbnail.classList.remove('active');
}

// ============================================================
// EVENTOS DEL TECLADO: focus y blur
// ============================================================
function handleFocus(event) {
    const thumbnail = event.currentTarget;
    console.log(`⌨️ Focus en: ${thumbnail.id}`);
    
    updateMainImage(thumbnail);
    thumbnail.classList.add('active');
    
    thumbnail.style.outline = '3px solid #ea580c';
    thumbnail.style.outlineOffset = '3px';
}

function handleBlur(event) {
    const thumbnail = event.currentTarget;
    console.log(`⌨️ Blur en: ${thumbnail.id}`);
    
    restoreOriginalState();
    thumbnail.classList.remove('active');
    
    thumbnail.style.outline = 'none';
}

// ============================================================
// FUNCIÓN PARA INICIALIZAR LA GALERÍA
// ============================================================
function initializeGallery() {
    console.log('\n=== INICIALIZANDO GALERÍA DE MOTOS ===');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('mouseover', handleMouseOver);
        thumbnail.addEventListener('mouseleave', handleMouseLeave);
        
        thumbnail.addEventListener('focus', handleFocus);
        thumbnail.addEventListener('blur', handleBlur);
        
        console.log(`Listeners agregados a miniatura ${index + 1}`);
    });
    
    console.log('✅ Galería inicializada correctamente');
    console.log('====================================\n');
}

// ============================================================
// FUNCIÓN DE VALIDACIÓN DE ALT TEXT
// ============================================================
function validateAltText() {
    console.log('=== VALIDANDO ALT TEXT ===');
    let hasErrors = false;
    
    thumbnails.forEach((thumb, index) => {
        const img = thumb.querySelector('img');
        if (img) {
            const alt = img.getAttribute('alt');
            if (!alt || alt.trim() === '') {
                console.error(`❌ Miniatura ${index + 1}: SIN alt text`);
                hasErrors = true;
            } else {
                console.log(`✅ Miniatura ${index + 1}: "${alt}"`);
            }
        }
    });
    
    if (!hasErrors) {
        console.log('✅ Todas las imágenes tienen alt text válido');
    }
    console.log('================================\n');
}

// ============================================================
// EVENTO ONLOAD
// ============================================================
window.addEventListener('load', function() {
    console.log('\n🚀 Página completamente cargada');
    console.log('==================================');
    
    addTabIndex();
    initializeGallery();
    setTimeout(validateAltText, 100);
    
    console.log('✅ Todos los eventos han sido configurados');
    console.log('==========================================\n');
});

// ============================================================
// SOPORTE PARA TECLA ENTER/ESPACIO
// ============================================================
document.addEventListener('keydown', function(event) {
    if ((event.key === 'Enter' || event.key === ' ') && 
        document.activeElement && 
        document.activeElement.classList.contains('thumbnail')) {
        
        event.preventDefault();
        const thumbnail = document.activeElement;
        console.log(`⌨️ Tecla ${event.key} presionada en: ${thumbnail.id}`);
        
        if (thumbnail.classList.contains('active')) {
            restoreOriginalState();
            thumbnail.classList.remove('active');
        } else {
            updateMainImage(thumbnail);
            thumbnail.classList.add('active');
        }
    }
});