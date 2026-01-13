document.querySelector('.menu-movil').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            
            const icono = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icono.classList.remove('fa-bars');
                icono.classList.add('fa-times');
            } else {
                icono.classList.remove('fa-times');
                icono.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.menu-movil i').classList.remove('fa-times');
                    document.querySelector('.menu-movil i').classList.add('fa-bars');
                }
            });
        });

        function enviarEmail() {
            const email = 'ricardosahily140@gmail.com';
            const asunto = 'Contacto desde portafolio';
            const cuerpo = 'Hola SRomlet, vi tu portafolio y me gustaría contactarte.';
            
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        }

        function enviarWhatsApp() {
            const telefono = '5363263899';
            const mensaje = 'Hola SRomlet, vi tu portafolio y me gustaría contactarte.';
            
            window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
        }

        function proximamente() {
            const detalles = `✨ PROYECTO REAL EN DESARROLLO

📋 CLIENTE: Manicurista independiente
🎯 OBJETIVO: Aumentar su clientela mediante presencia digital

🌟 CARACTERÍSTICAS:
• Portada atractiva con sus mejores trabajos
• Sección de servicios (manicura, pedicura, decorados)
• Galería interactiva con antes/después
• Precios transparentes y promociones
• Botón directo de WhatsApp para citas
• Testimonios de clientes satisfechas

📊 OBJETIVOS DEL PROYECTO:
1. Practicar con cliente real
2. Ayudar a emprendedora local
3. Crear portafolio con caso real
4. Mejorar mis habilidades de UX

⏰ ESTADO: En fase de diseño - Próxima a desarrollo

💡 ¿Tienes un negocio similar que necesite página web?`;
            
            alert(detalles);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    if (window.innerWidth <= 768) {
                        document.querySelector('.nav-links').classList.remove('active');
                        document.querySelector('.menu-movil i').classList.remove('fa-times');
                        document.querySelector('.menu-movil i').classList.add('fa-bars');
                    }
                }
            });
        });

        function detectarEntorno() {
            if (window.location.hostname.includes('github.io')) {
                return 'github';
            } else if (window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1') {
                return 'produccion';
            } else {
                return 'local';
            }
        }

        function configurarFormulario() {
            const entorno = detectarEntorno();
            const redirectUrl = document.getElementById('redirect-url');
            
            if (entorno === 'github') {
                const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
                redirectUrl.value = baseUrl + '/gracias.html';
            } else if (entorno === 'produccion') {
                redirectUrl.value = window.location.origin + '/gracias.html';
            } else {
                redirectUrl.value = window.location.origin + '/gracias.html';
            }
        }

        document.getElementById('telefono').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });

        document.getElementById('presupuesto').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9-USDusd\s]/g, '');
        });

        document.getElementById('form-contacto').addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;
            const originalWidth = submitBtn.offsetWidth;
            const entorno = detectarEntorno();
            
            submitBtn.style.minWidth = originalWidth + 'px';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            if (entorno === 'local') {
                e.preventDefault();
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                    
                    const nombre = document.getElementById('nombre').value;
                    const email = document.getElementById('email').value;
                    
                    alert(`MODO PRUEBA (Local)\n\nNombre: ${nombre}\nEmail: ${email}\n\nEn producción, esto se enviaría a tu email.`);
                    
                    this.reset();
                    
                    setTimeout(() => {
                        window.location.href = 'gracias.html';
                    }, 1500);
                }, 2000);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.minWidth = '';
                    submitBtn.style.background = '';
                }, 5000);
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            configurarFormulario();
            
            if (window.location.pathname.includes('gracias')) {
                setTimeout(() => {
                    const icono = document.querySelector('.icono-exito');
                    if (icono) {
                        icono.style.animation = 'aparecer 0.5s ease';
                    }
                }, 100);
            }
        });