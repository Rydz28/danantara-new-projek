/**
 * Danantara - Daya Anagata Nusantara
 * JavaScript untuk animasi dan interaktivitas
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi semua modul utama
    BackgroundEffects.init();
    Navigation.init();
    IndonesiaMap.init();
    DataVisualization.init();
    ProjectHolograms.init();
    ScrollEffects.init();
    PageTransitions.init();
    InteractiveElements.init();
});

/**
 * Modul efek latar belakang dengan partikel dan aliran data
 */
const BackgroundEffects = {
    init() {
        this.container = document.getElementById('background-container');
        this.particleContainer = document.querySelector('.particle-container');
        this.dataFlowContainer = document.querySelector('.data-flow-container');
        
        if (!this.container) return;
        
        // Buat partikel dan aliran data
        this.createParticles();
        this.createDataFlows();
        
        // Tambahkan efek interaksi mouse
        this.addMouseInteraction();
        this.startAutoAnimation();
    },
    
    createParticles() {
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Atur properti acak
            const size = Math.random() * 4 + 1;
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: `${Math.random() * 0.3 + 0.1}`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out ${-Math.random() * 10}s`
            });
            
            this.particleContainer.appendChild(particle);
        }
    },
    
    createDataFlows() {
        const flowCount = window.innerWidth < 768 ? 5 : 15;
        
        for (let i = 0; i < flowCount; i++) {
            const line = document.createElement('div');
            
            Object.assign(line.style, {
                position: 'absolute',
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 20 + 10}%`,
                left: `${Math.random() * 100}%`,
                top: '-10%',
                background: 'linear-gradient(to bottom, rgba(77, 184, 255, 0), rgba(77, 184, 255, 0.5), rgba(77, 184, 255, 0))',
                opacity: `${Math.random() * 0.2 + 0.1}`,
                animation: `dataflow ${Math.random() * 5 + 5}s infinite linear ${Math.random() * 5}s`
            });
            
            this.dataFlowContainer.appendChild(line);
        }
    },
    
    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.animateOnMouseMove(e);
        });
    },
    
    animateOnMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Efek parallax untuk container
        this.container.style.transform = `translate(${-mouseX * 20}px, ${-mouseY * 20}px)`;
        
        // Efek untuk partikel individual
        document.querySelectorAll('.particle').forEach((particle, index) => {
            const speed = (index % 5) * 0.2 + 0.5;
            particle.style.transform = `translate(${-mouseX * 50 * speed}px, ${-mouseY * 50 * speed}px)`;
        });
        
        // Tandai bahwa pengguna berinteraksi
        this.container.setAttribute('data-user-interaction', 'true');
        clearTimeout(this.interactionTimeout);
        
        this.interactionTimeout = setTimeout(() => {
            this.container.removeAttribute('data-user-interaction');
        }, 5000);
    },
    
    startAutoAnimation() {
        let time = 0;
        
        const animate = () => {
            if (!this.container.hasAttribute('data-user-interaction')) {
                time += 0.01;
                const x = Math.sin(time) * 0.2;
                const y = Math.cos(time) * 0.2;
                
                // Efek parallax untuk container
                this.container.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                
                // Efek untuk partikel individual
                document.querySelectorAll('.particle').forEach((particle, index) => {
                    const speed = (index % 5) * 0.2 + 0.5;
                    particle.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
                });
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
};

/**
 * Modul navigasi holografik
 */
const Navigation = {
    init() {
        this.menuItems = document.querySelectorAll('.holo-item');
        if (!this.menuItems.length) return;
        
        // Tambahkan efek dan interaksi
        this.addMenuEffects();
        this.setupScrollSpy();
    },
    
    addMenuEffects() {
        this.menuItems.forEach(item => {
            // Efek hover
            item.addEventListener('mouseenter', () => this.addHolographicEffect(item));
            
            // Efek klik
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMenuClick(e, item);
            });
        });
    },
    
    addHolographicEffect(element) {
        if (element.querySelector('.holo-effect')) return;
        
        const effect = document.createElement('span');
        effect.className = 'holo-effect';
        
        Object.assign(effect.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(77, 184, 255, 0.2) 0%, rgba(77, 184, 255, 0) 50%, rgba(77, 184, 255, 0.2) 100%)',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: '-1'
        });
        
        element.appendChild(effect);
        
        // Animasi fade-in / fade-out
        setTimeout(() => { effect.style.opacity = '1'; }, 10);
        setTimeout(() => {
            effect.style.opacity = '0';
            setTimeout(() => effect.remove(), 300);
        }, 1000);
    },
    
    handleMenuClick(e, item) {
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // Aktifkan transisi halaman
        PageTransitions.show();
        
        // Tambahkan efek ripple
        this.createRipple(e, item);
        
        // Scroll ke section setelah delay pendek
        setTimeout(() => {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Sembunyikan transisi
            setTimeout(() => PageTransitions.hide(), 300);
            
            // Update menu aktif
            this.menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        }, 300);
    },
    
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${event.clientX - rect.left - size/2}px`,
            top: `${event.clientY - rect.top - size/2}px`,
            background: 'radial-gradient(circle, rgba(77, 184, 255, 0.8) 0%, rgba(77, 184, 255, 0) 70%)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });
        
        // Tambahkan keyframes jika belum ada
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `@keyframes ripple { to { transform: scale(2); opacity: 0; } }`;
            document.head.appendChild(style);
        }
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    },
    
    setupScrollSpy() {
        // Update menu aktif saat scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = `#${section.id}`;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.menuItems.forEach(item => {
                        item.classList.toggle('active', item.getAttribute('href') === sectionId);
                    });
                }
            });
        });
        
        // Set item awal sebagai aktif
        this.updateActiveMenuOnLoad();
    },
    
    updateActiveMenuOnLoad() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section');
        let activeSet = false;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && !activeSet) {
                const sectionId = `#${section.id}`;
                this.menuItems.forEach(item => {
                    if (item.getAttribute('href') === sectionId) {
                        item.classList.add('active');
                        activeSet = true;
                    }
                });
            }
        });
        
        // Jika tidak ada section yang aktif, atur beranda sebagai default
        if (!activeSet && this.menuItems.length) {
            this.menuItems[0].classList.add('active');
        }
    }
};

/**
 * Modul peta interaktif Indonesia dengan Three.js
 */
const IndonesiaMap = {
    init() {
        this.mapContainer = document.getElementById('indonesia-map');
        if (!this.mapContainer || typeof THREE === 'undefined') return;
        
        try {
            this.initThreeJS();
            this.createDetailedMap();
            this.createProjects();
            this.addMapInteraction();
            this.startAnimation();
            this.handleResize();
        } catch (error) {
            console.error('Error initializing map:', error);
            // Tampilkan fallback jika Three.js gagal diinisialisasi
            this.showMapFallback();
        }
    },
    
    showMapFallback() {
        // Fallback sederhana jika Three.js gagal
        if (this.mapContainer) {
            this.mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #4db8ff;">
                    <p>Peta Indonesia sedang dimuat...</p>
                </div>
            `;
        }
    },
    
    initThreeJS() {
        // Buat scene, camera, dan renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.mapContainer.offsetWidth / this.mapContainer.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        // Atur ukuran renderer
        this.renderer.setSize(this.mapContainer.offsetWidth, this.mapContainer.offsetHeight);
        this.mapContainer.appendChild(this.renderer.domElement);
        
        // Tambahkan pencahayaan
        const ambient = new THREE.AmbientLight(0x404040);
        this.scene.add(ambient);
        
        const directional = new THREE.DirectionalLight(0x4db8ff, 1);
        directional.position.set(1, 1, 1);
        this.scene.add(directional);
        
        // Posisi kamera
        this.camera.position.z = 2;
    },
    
    createDetailedMap() {
        // Material untuk peta
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4db8ff,
            transparent: true,
            opacity: 0.3
        });
        
        const fillMaterial = new THREE.MeshBasicMaterial({
            color: 0x4db8ff,
            transparent: true,
            opacity: 0.1
        });
        
        // Definisikan pulau-pulau Indonesia (disederhanakan untuk demo)
        this.islands = [
            {
                name: 'Sumatera',
                points: [
                    new THREE.Vector3(-1.5, 0.2, 0),
                    new THREE.Vector3(-1.0, -0.3, 0),
                    new THREE.Vector3(-0.5, -0.4, 0),
                    new THREE.Vector3(-0.8, 0.1, 0),
                    new THREE.Vector3(-1.5, 0.2, 0)
                ]
            },
            {
                name: 'Jawa',
                points: [
                    new THREE.Vector3(-0.2, -0.5, 0),
                    new THREE.Vector3(0.5, -0.5, 0),
                    new THREE.Vector3(0.3, -0.4, 0),
                    new THREE.Vector3(-0.1, -0.4, 0),
                    new THREE.Vector3(-0.2, -0.5, 0)
                ]
            },
            {
                name: 'Kalimantan',
                points: [
                    new THREE.Vector3(0.0, 0.0, 0),
                    new THREE.Vector3(0.0, 0.4, 0),
                    new THREE.Vector3(0.5, 0.2, 0),
                    new THREE.Vector3(0.3, -0.1, 0),
                    new THREE.Vector3(0.0, 0.0, 0)
                ]
            },
            {
                name: 'Sulawesi',
                points: [
                    new THREE.Vector3(0.8, 0.3, 0),
                    new THREE.Vector3(1.0, 0.2, 0),
                    new THREE.Vector3(0.9, 0.0, 0),
                    new THREE.Vector3(1.1, -0.2, 0),
                    new THREE.Vector3(0.9, -0.1, 0),
                    new THREE.Vector3(1.0, 0.1, 0),
                    new THREE.Vector3(0.8, 0.3, 0)
                ]
            },
            {
                name: 'Papua',
                points: [
                    new THREE.Vector3(1.5, 0.3, 0),
                    new THREE.Vector3(2.0, 0.2, 0),
                    new THREE.Vector3(1.8, 0.0, 0),
                    new THREE.Vector3(1.5, 0.1, 0),
                    new THREE.Vector3(1.5, 0.3, 0)
                ]
            }
        ];
        
        // Buat pulau-pulau
        this.islands.forEach(island => {
            // Buat outline
            const geometry = new THREE.BufferGeometry().setFromPoints(island.points);
            const line = new THREE.Line(geometry, lineMaterial);
            this.scene.add(line);
            
            // Buat fill
            const shape = new THREE.Shape();
            island.points.forEach((point, i) => {
                if (i === 0) shape.moveTo(point.x, point.y);
                else shape.lineTo(point.x, point.y);
            });
            
            const shapeGeometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(shapeGeometry, fillMaterial);
            this.scene.add(mesh);
        });
    },
    
    createProjects() {
        // Data proyek
        this.projects = [
            { location: 'jakarta', position: new THREE.Vector3(0.2, -0.5, 0), color: 0x4db8ff },
            { location: 'surabaya', position: new THREE.Vector3(0.4, -0.5, 0), color: 0xff5e85 },
            { location: 'bali', position: new THREE.Vector3(0.6, -0.6, 0), color: 0x4dff9e },
            { location: 'makassar', position: new THREE.Vector3(0.9, -0.1, 0), color: 0xff5e85 }
        ];
        
        // Buat titik-titik proyek
        this.projects.forEach(project => {
            // Titik proyek
            const pointGeometry = new THREE.SphereGeometry(0.03, 16, 16);
            const pointMaterial = new THREE.MeshBasicMaterial({
                color: project.color,
                transparent: true,
                opacity: 0.8
            });
            
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.copy(project.position);
            point.userData = { type: 'project', location: project.location };
            this.scene.add(point);
            
            // Efek pulse
            const pulseGeometry = new THREE.SphereGeometry(0.03, 16, 16);
            const pulseMaterial = new THREE.MeshBasicMaterial({
                color: project.color,
                transparent: true,
                opacity: 0.3
            });
            
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            pulse.position.copy(project.position);
            pulse.userData = { 
                type: 'pulse',
                location: project.location,
                baseScale: 1,
                pulseSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(pulse);
        });
        
        // Buat koneksi antar proyek
        for (let i = 0; i < this.projects.length; i++) {
            for (let j = i + 1; j < this.projects.length; j++) {
                const connectionMaterial = new THREE.LineBasicMaterial({
                    color: 0x4db8ff,
                    transparent: true,
                    opacity: 0.2
                });
                
                const connectionPoints = [
                    this.projects[i].position,
                    this.projects[j].position
                ];
                
                const connectionGeometry = new THREE.BufferGeometry().setFromPoints(connectionPoints);
                const connection = new THREE.Line(connectionGeometry, connectionMaterial);
                
                connection.userData = {
                    type: 'connection',
                    from: this.projects[i].location,
                    to: this.projects[j].location,
                    time: Math.random() * 10
                };
                
                this.scene.add(connection);
            }
        }
    },
    
    addMapInteraction() {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        this.mapContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            this.mapContainer.setAttribute('data-user-dragging', 'true');
        });
        
        this.mapContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            this.scene.rotation.y += deltaMove.x * 0.005;
            this.scene.rotation.x += deltaMove.y * 0.005;
            
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });
        
        const endDrag = () => {
            isDragging = false;
            setTimeout(() => {
                this.mapContainer.removeAttribute('data-user-dragging');
            }, 2000);
        };
        
        this.mapContainer.addEventListener('mouseup', endDrag);
        this.mapContainer.addEventListener('mouseleave', endDrag);
        
        // Zoom dengan wheel
        this.mapContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            this.camera.position.z += e.deltaY * 0.001;
            this.camera.position.z = Math.max(1, Math.min(5, this.camera.position.z));
        });
    },
    
    startAnimation() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Animasikan elmen-elemen peta
            this.scene.children.forEach(object => {
                if (object.userData.type === 'pulse') {
                    object.userData.baseScale += object.userData.pulseSpeed;
                    
                    if (object.userData.baseScale > 3) {
                        object.userData.baseScale = 1;
                    }
                    
                    const scale = object.userData.baseScale;
                    object.scale.set(scale, scale, scale);
                    object.material.opacity = 0.3 / scale;
                }
                
                if (object.userData.type === 'connection') {
                    object.userData.time += 0.05;
                    object.material.opacity = 0.1 + 0.1 * Math.sin(object.userData.time);
                }
            });
            
            // Animasikan rotasi peta ketika tidak sedang di-drag
            if (!this.mapContainer.hasAttribute('data-user-dragging')) {
                this.scene.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    },
    
    handleResize() {
        window.addEventListener('resize', () => {
            if (!this.mapContainer) return;
            
            this.camera.aspect = this.mapContainer.offsetWidth / this.mapContainer.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.mapContainer.offsetWidth, this.mapContainer.offsetHeight);
        });
    }
};

/**
 * Modul visualisasi data dengan Chart.js
 */
const DataVisualization = {
    init() {
        this.canvas = document.getElementById('dataCanvas');
        if (!this.canvas || typeof Chart === 'undefined') return;
        
        try {
            this.setupDataSets();
            this.createChart();
            this.setupControls();
        } catch (error) {
            console.error('Error initializing data visualization:', error);
            this.showChartFallback();
        }
    },
    
    showChartFallback() {
        // Fallback sederhana jika chart gagal diinisialisasi
        if (this.canvas) {
            const container = this.canvas.parentElement;
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #4db8ff;">
                    <p>Visualisasi data sedang dimuat...</p>
                </div>
            `;
        }
    },
    
    setupDataSets() {
        // Data untuk visualisasi
        this.data = {
            yearly: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Investasi (Rp Triliun)',
                    data: [2.5, 3.8, 5.2, 7.9, 10.3, 12.5],
                    backgroundColor: 'rgba(77, 184, 255, 0.2)',
                    borderColor: '#4db8ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#4db8ff',
                    tension: 0.3
                }]
            },
            quarterly: {
                labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023'],
                datasets: [{
                    label: 'Investasi (Rp Triliun)',
                    data: [2.3, 2.5, 2.7, 2.8, 3.0, 3.2],
                    backgroundColor: 'rgba(77, 184, 255, 0.2)',
                    borderColor: '#4db8ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#4db8ff',
                    tension: 0.3
                }]
            },
            monthly: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Investasi (Rp Triliun)',
                    data: [1.0, 1.1, 0.9, 1.2, 1.3, 1.1],
                    backgroundColor: 'rgba(77, 184, 255, 0.2)',
                    borderColor: '#4db8ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#4db8ff',
                    tension: 0.3
                }]
            }
        };
        
        this.currentView = 'graph';
        this.currentPeriod = 'yearly';
    },
    
    createChart() {
        // Dapatkan konteks canvas
        const ctx = this.canvas.getContext('2d');
        
        // Buat gradient untuk area di bawah grafik
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(77, 184, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(77, 184, 255, 0)');
        
        // Salin dataset dan terapkan gradient
        const datasets = [...this.data[this.currentPeriod].datasets];
        datasets[0] = { ...datasets[0], backgroundColor: gradient, fill: true };
        
        // Buat chart
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data[this.currentPeriod].labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { labels: { color: '#e8e8e8' }},
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 23, 0.9)',
                        titleColor: '#4db8ff',
                        bodyColor: '#e8e8e8',
                        borderColor: 'rgba(77, 184, 255, 0.3)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#8a8a8a' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#8a8a8a' }
                    }
                },
                animations: {
                    tension: { duration: 1000, easing: 'easeOutQuad' }
                }
            }
        });
    },
    
    setupControls() {
        // Kontrol periode (tahunan, kuartalan, bulanan)
        const timeButtons = document.querySelectorAll('.time-btn');
        timeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update tampilan tombol
                timeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update data
                this.currentPeriod = button.getAttribute('data-time');
                this.updateVisualization();
            });
        });
        
        // Kontrol tampilan (grafik, peta, tabel)
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update tampilan tombol
                viewButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update tampilan
                this.currentView = button.getAttribute('data-view');
                this.updateVisualization();
            });
        });
    },
    
    updateVisualization() {
        // Hancurkan chart yang ada
        if (this.chart && typeof this.chart.destroy === 'function') {
            this.chart.destroy();
        }
        
        // Hapus tabel jika ada
        const existingTable = document.querySelector('.data-table');
        if (existingTable) existingTable.remove();
        
        // Terapkan visualisasi berdasarkan view yang dipilih
        if (this.currentView === 'graph') {
            this.createChart();
        } 
        else if (this.currentView === 'map') {
            this.createHeatmap();
        } 
        else if (this.currentView === 'table') {
            this.createTable();
        }
    },
    
    createHeatmap() {
        const ctx = this.canvas.getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Sebaran Investasi',
                    data: this.data[this.currentPeriod].datasets[0].data.map((value, index) => ({
                        x: index,
                        y: Math.random() * 5 + 1,
                        r: value * 5
                    })),
                    backgroundColor: (context) => {
                        try {
                            const value = context.raw.r / 5;
                            const alpha = value / 15;
                            return `rgba(77, 184, 255, ${alpha})`;
                        } catch (e) {
                            return 'rgba(77, 184, 255, 0.3)';
                        }
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#8a8a8a' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: {
                            color: '#8a8a8a',
                            callback: (value) => {
                                try {
                                    return this.data[this.currentPeriod].labels[value];
                                } catch (e) {
                                    return value;
                                }
                            }
                        }
                    }
                },
                plugins: {
                    legend: { labels: { color: '#e8e8e8' }},
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 23, 0.9)',
                        titleColor: '#4db8ff',
                        bodyColor: '#e8e8e8',
                        callbacks: {
                            label: (context) => {
                                try {
                                    return `Rp ${context.raw.r / 5} Triliun`;
                                } catch (e) {
                                    return 'Data tidak tersedia';
                                }
                            }
                        }
                    }
                }
            }
        });
    },
    
    createTable() {
        // Bersihkan canvas
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Buat elemen tabel
        const container = this.canvas.parentElement;
        const table = document.createElement('div');
        table.className = 'data-table';
        
        Object.assign(table.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            padding: '2rem'
        });
        
        // Generate HTML tabel
        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse; color: #e8e8e8;">
                <thead>
                    <tr>
                        <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2); text-align: left;">Periode</th>
                        <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2); text-align: right;">Nilai Investasi (Rp Triliun)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        const labels = this.data[this.currentPeriod].labels;
        const values = this.data[this.currentPeriod].datasets[0].data;
        
        labels.forEach((label, index) => {
            tableHTML += `
                <tr>
                    <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;">${label}</td>
                    <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right; color: #4db8ff;">${values[index]}</td>
                </tr>
            `;
        });
        
        tableHTML += '</tbody></table>';
        table.innerHTML = tableHTML;
        container.appendChild(table);
        
        // Chart dummy untuk konsistensi API
        this.chart = {
            destroy: function() {
                const table = document.querySelector('.data-table');
                if (table) table.remove();
            }
        };
    }
};

/**
 * Modul hologram untuk kartu proyek
 */
const ProjectHolograms = {
    init() {
        this.holograms = document.querySelectorAll('.project-hologram');
        if (!this.holograms.length) return;
        
        this.holograms.forEach(hologram => {
            const projectCard = hologram.closest('.project-card');
            if (!projectCard) return;
            
            const location = projectCard.getAttribute('data-location');
            this.createHologram(hologram, location);
            
            // Tambahkan interaktivitas
            projectCard.addEventListener('mouseenter', () => {
                hologram.classList.add('active');
            });
            
            projectCard.addEventListener('mouseleave', () => {
                hologram.classList.remove('active');
            });
        });
    },
    
    createHologram(container, location) {
        // Buat canvas untuk hologram
        const canvas = document.createElement('canvas');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Pengaturan warna berdasarkan lokasi
        const colorMap = {
            'jakarta': { hue: 210, elements: this.createCityElements }, // Biru
            'surabaya': { hue: 340, elements: this.createIndustrialElements }, // Merah muda
            'bali': { hue: 120, elements: this.createIslandElements }, // Hijau
            'makassar': { hue: 20, elements: this.createMaritimeElements }, // Oranye
            'default': { hue: 210, elements: this.createDefaultElements }
        };
        
        const settings = colorMap[location] || colorMap.default;
        const elements = settings.elements(canvas.width, canvas.height);
        
        // Jalankan animasi
        this.animateHologram(ctx, canvas.width, canvas.height, settings.hue, elements);
    },
    
    animateHologram(ctx, width, height, hue, elements) {
        // Fungsi untuk animasi hologram
        const draw = () => {
            // Bersihkan canvas
            ctx.clearRect(0, 0, width, height);
            
            // Gambar background
            ctx.fillStyle = `hsla(${hue}, 80%, 10%, 0.8)`;
            ctx.fillRect(0, 0, width, height);
            
            // Gambar grid
            this.drawHologramGrid(ctx, width, height, hue);
            
            // Update dan gambar elemen
            elements.forEach(element => {
                if (typeof element.update === 'function') {
                    element.update();
                }
                if (typeof element.draw === 'function') {
                    element.draw(ctx, hue);
                }
            });
            
            // Gambar overlay efek hologram
            this.drawHologramOverlay(ctx, width, height, hue);
            
            // Lanjutkan animasi
            requestAnimationFrame(draw);
        };
        
        draw();
    },
    
    drawHologramGrid(ctx, width, height, hue) {
        const gridSize = 20;
        const time = Date.now() * 0.001;
        
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.2)`;
        ctx.lineWidth = 1;
        
        // Grid horizontal
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            
            const opacity = 0.1 + 0.1 * Math.sin(time + y * 0.01);
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
            ctx.stroke();
        }
        
        // Grid vertikal
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            
            const opacity = 0.1 + 0.1 * Math.cos(time + x * 0.01);
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
            ctx.stroke();
        }
    },
    
    drawHologramOverlay(ctx, width, height, hue) {
        // Garis scan
        const time = Date.now() * 0.001;
        const scanPos = height * (0.5 + 0.5 * Math.sin(time * 0.5));
        
        // Gradient untuk garis scan
        const gradient = ctx.createLinearGradient(0, scanPos - 5, 0, scanPos + 5);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);
        
        // Gambar garis scan
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanPos - 5, width, 10);
        
        // Efek layar hologram
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.05)`;
        ctx.fillRect(0, 0, width, height);
        
        // Acak efek glitch
        if (Math.random() > 0.97) {
            // Glitch overlay
            ctx.fillStyle = `hsla(${hue}, 80%, 70%, 0.1)`;
            ctx.fillRect(0, Math.random() * height, width, 2);
        }
    },
    
    createCityElements(width, height) {
        // Jakarta - Skyline kota
        return [{
            update: function() {
                // Tidak ada update dinamis untuk gedung
            },
            draw: function(ctx, hue) {
                // Gambar gedung-gedung
                for (let i = 0; i < 8; i++) {
                    const buildingWidth = (width / 8) - 10;
                    const buildingHeight = 30 + Math.sin(Date.now() * 0.001 + i) * 10;
                    const x = i * (width / 8) + 5;
                    
                    // Gambar gedung
                    ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.5)`;
                    ctx.fillRect(x, height - buildingHeight, buildingWidth, buildingHeight);
                    
                    // Gambar jendela-jendela
                    for (let j = 0; j < 5; j++) {
                        for (let k = 0; k < 3; k++) {
                            if (Math.random() > 0.5) {
                                ctx.fillStyle = `hsla(${hue}, 80%, 80%, 0.8)`;
                                ctx.fillRect(
                                    x + 5 + k * (buildingWidth / 4),
                                    height - buildingHeight + 10 + j * 10,
                                    2, 2
                                );
                            }
                        }
                    }
                }
            }
        }];
    },
    
    createIndustrialElements(width, height) {
        // Surabaya - Bentuk industrial dengan hexagon
        return [{
            hexagons: Array.from({ length: 10 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 15 + 10,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
            })),
            update: function() {
                this.hexagons.forEach(hex => {
                    hex.rotation += hex.rotationSpeed;
                });
            },
            draw: function(ctx, hue) {
                this.hexagons.forEach(hex => {
                    ctx.save();
                    ctx.translate(hex.x, hex.y);
                    ctx.rotate(hex.rotation);
                    
                    // Gambar hexagon
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = i * Math.PI / 3;
                        const x = hex.size * Math.cos(angle);
                        const y = hex.size * Math.sin(angle);
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    
                    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    ctx.restore();
                });
            }
        }];
    },
    
    createIslandElements(width, height) {
        // Bali - Bentuk pulau dan gelombang
        return [{
            time: 0,
            update: function() {
                this.time += 0.01;
            },
            draw: function(ctx, hue) {
                // Gambar pola gelombang
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    const offset = i * 20;
                    const amplitude = 10 + i * 5;
                    const frequency = 0.02;
                    
                    ctx.moveTo(0, height / 2 + offset);
                    for (let x = 0; x < width; x += 5) {
                        const y = height / 2 + offset + Math.sin(x * frequency + this.time) * amplitude;
                        ctx.lineTo(x, y);
                    }
                    
                    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.3 - i * 0.1})`;
                    ctx.lineWidth = 3 - i;
                    ctx.stroke();
                }
                
                // Gambar lingkaran (pulau)
                for (let i = 0; i < 5; i++) {
                    const x = width / 2 + Math.cos(this.time + i) * (width / 4);
                    const y = height / 2 + Math.sin(this.time * 0.5 + i) * (height / 4);
                    const radius = 5 + i * 3;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${0.5 - i * 0.1})`;
                    ctx.fill();
                }
            }
        }];
    },
    
    createMaritimeElements(width, height) {
        // Makassar - Kapal dan rute maritim
        return [{
            ships: Array.from({ length: 5 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.2,
                size: Math.random() * 3 + 2
            })),
            update: function() {
                this.ships.forEach(ship => {
                    ship.x += Math.cos(ship.angle) * ship.speed;
                    ship.y += Math.sin(ship.angle) * ship.speed;
                    
                    // Wrap around edges
                    if (ship.x < 0) ship.x = width;
                    if (ship.x > width) ship.x = 0;
                    if (ship.y < 0) ship.y = height;
                    if (ship.y > height) ship.y = 0;
                });
            },
            draw: function(ctx, hue) {
                // Gambar jalur
                ctx.beginPath();
                this.ships.forEach((ship, i) => {
                    if (i === 0) ctx.moveTo(ship.x, ship.y);
                    else ctx.lineTo(ship.x, ship.y);
                });
                ctx.closePath();
                ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.2)`;
                ctx.stroke();
                
                // Gambar kapal
                this.ships.forEach(ship => {
                    ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
                    ctx.beginPath();
                    ctx.arc(ship.x, ship.y, ship.size, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Gambar jejak
                    ctx.beginPath();
                    ctx.moveTo(ship.x, ship.y);
                    ctx.lineTo(
                        ship.x - Math.cos(ship.angle) * 10,
                        ship.y - Math.sin(ship.angle) * 10
                    );
                    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.3)`;
                    ctx.stroke();
                });
            }
        }];
    },
    
    createDefaultElements(width, height) {
        // Default abstract pattern
        return [{
            time: 0,
            particles: Array.from({ length: 20 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 5 + 2
            })),
            update: function() {
                this.time += 0.01;
                this.particles.forEach(p => {
                    p.x += Math.sin(this.time + p.y * 0.1) * 0.5;
                    p.y += Math.cos(this.time + p.x * 0.1) * 0.5;
                    
                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;
                });
            },
            draw: function(ctx, hue) {
                // Gambar partikel
                this.particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.5)`;
                    ctx.fill();
                });
                
                // Koneksi antar partikel
                ctx.beginPath();
                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        const dx = this.particles[i].x - this.particles[j].x;
                        const dy = this.particles[i].y - this.particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist < 50) {
                            ctx.moveTo(this.particles[i].x, this.particles[i].y);
                            ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        }
                    }
                }
                ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.2)`;
                ctx.stroke();
            }
        }];
    }
};

/**
 * Modul untuk efek scroll dan animasi elemen
 */
const ScrollEffects = {
    init() {
        this.setupAnimations();
        this.setupParallaxEffects();
    },
    
    setupAnimations() {
        // Elemen yang akan dianimasi saat discroll
        const elements = [
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.tech-feature'),
            ...document.querySelectorAll('.highlight-card'),
            ...document.querySelectorAll('.team-card'),
            ...document.querySelectorAll('.stat-item')
        ];
        
        // Tambahkan kelas untuk animasi
        elements.forEach(el => el.classList.add('scroll-animate'));
        
        // Tambahkan style untuk animasi
        if (!document.querySelector('#scroll-animations')) {
            const style = document.createElement('style');
            style.id = 'scroll-animations';
            style.textContent = `
                .scroll-animate {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Buat observer untuk scroll
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Observe semua elemen
            elements.forEach(el => {
                try {
                    observer.observe(el);
                } catch (error) {
                    // Fallback jika observe gagal
                    el.classList.add('animate-in');
                }
            });
        } else {
            // Fallback untuk browser yang tidak mendukung IntersectionObserver
            elements.forEach(el => el.classList.add('animate-in'));
        }
    },
    
    setupParallaxEffects() {
        const heroContent = document.querySelector('.hero-content');
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Parallax untuk hero section
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
            
            // Parallax untuk section headers
            sectionHeaders.forEach(header => {
                const headerTop = header.offsetTop;
                const headerHeight = header.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (scrollY + windowHeight > headerTop && scrollY < headerTop + headerHeight) {
                    const offset = (scrollY + windowHeight - headerTop) * 0.1;
                    header.style.transform = `translateY(${-offset}px)`;
                }
            });
        });
    }
};

/**
 * Modul untuk transisi halaman
 */
const PageTransitions = {
    init() {
        this.transitionElement = document.querySelector('.page-transition');
        if (!this.transitionElement) return;
        
        // Sembunyikan transisi awal
        setTimeout(() => {
            this.transitionElement.style.display = 'none';
        }, 500);
    },
    
    show() {
        if (!this.transitionElement) return;
        
        this.transitionElement.style.display = 'block';
        setTimeout(() => {
            this.transitionElement.classList.add('active');
        }, 10);
    },
    
    hide() {
        if (!this.transitionElement) return;
        
        this.transitionElement.classList.remove('active');
        setTimeout(() => {
            this.transitionElement.style.display = 'none';
        }, 800);
    }
};

/**
 * Modul elemen interaktif (tombol, form, dll)
 */
const InteractiveElements = {
    init() {
        this.setupButtons();
        this.setupForms();
        this.setupCyberSecurityVisual();
    },
    
    setupButtons() {
        // Tombol yang mendapatkan efek partikel
        const buttons = [
            ...document.querySelectorAll('.cta-button'),
            ...document.querySelectorAll('.detail-btn'),
            ...document.querySelectorAll('.subscribe-btn')
        ];
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createParticleEffect(e.clientX, e.clientY, button);
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = 'var(--glow-blue)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    },
    
    setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const button = form.querySelector('button[type="submit"]');
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = 'Terkirim!';
                    button.style.backgroundColor = '#4dff9e';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        form.reset();
                    }, 2000);
                }
            });
        });
    },
    
    createParticleEffect(x, y, sourceElement) {
        try {
            // Buat container untuk partikel
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
            
            // Warna partikel
            const buttonColor = window.getComputedStyle(sourceElement).backgroundColor;
            const particleColor = buttonColor !== 'rgba(0, 0, 0, 0)' ? buttonColor : 'rgba(77, 184, 255, 0.8)';
            
            // Buat partikel
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                
                // Properti dasar
                Object.assign(particle.style, {
                    position: 'absolute',
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    backgroundColor: particleColor,
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(77, 184, 255, 0.8)'
                });
                
                // Posisi awal
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                container.appendChild(particle);
                
                // Animasi partikel
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const duration = Math.random() * 1000 + 500;
                
                // Animasi dengan requestAnimationFrame
                const startTime = Date.now();
                const animateParticle = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    
                    if (progress >= 1) {
                        particle.remove();
                        return;
                    }
                    
                    const currentX = x + vx * progress;
                    const currentY = y + vy * progress + 50 * progress * progress; // Add gravity
                    const opacity = 1 - progress;
                    
                    Object.assign(particle.style, {
                        left: `${currentX}px`,
                        top: `${currentY}px`,
                        opacity: opacity
                    });
                    
                    requestAnimationFrame(animateParticle);
                };
                
                requestAnimationFrame(animateParticle);
            }
            
            // Hapus container setelah animasi selesai
            setTimeout(() => {
                container.remove();
            }, 2000);
        } catch (error) {
            console.error('Error creating particle effect:', error);
        }
    },
    
    setupCyberSecurityVisual() {
        const visual = document.querySelector('.cyber-security-visual');
        if (!visual) return;
        
        // Membuat node tambahan secara dinamis
        const createAdditionalNodes = () => {
            const nodeContainer = visual.querySelector('.node-container');
            if (!nodeContainer) return;
            
            // Membuat 5 node lebih kecil dengan posisi acak
            for (let i = 0; i < 5; i++) {
                const node = document.createElement('div');
                node.className = 'node node-secondary';
                
                // Posisi acak
                node.style.top = `${Math.random() * 90 + 5}%`;
                node.style.left = `${Math.random() * 90 + 5}%`;
                node.style.width = `${Math.random() * 6 + 4}px`;
                node.style.height = node.style.width;
                node.style.animationDelay = `${Math.random() * 2}s`;
                
                nodeContainer.appendChild(node);
            }
        };
        
        // Membuat paket data dinamis yang bergerak antar node
        const createDynamicPackets = () => {
            const packetContainer = visual.querySelector('.data-packets');
            if (!packetContainer) return;
            
            const createPacket = () => {
                const packet = document.createElement('div');
                packet.className = 'data-packet';
                
                // Properti acak
                const size = Math.random() * 4 + 2;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = Math.random() * 100;
                const endY = Math.random() * 100;
                const duration = Math.random() * 3000 + 2000;
                const hue = Math.random() > 0.7 ? 120 : Math.random() > 0.3 ? 210 : 340;
                
                // Atur gaya
                Object.assign(packet.style, {
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: `hsla(${hue}, 80%, 60%, 0.9)`,
                    boxShadow: `0 0 5px hsla(${hue}, 80%, 60%, 0.8)`,
                    top: `${startY}%`,
                    left: `${startX}%`,
                    opacity: '0',
                    zIndex: '1',
                    transition: `all ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`
                });
                
                packetContainer.appendChild(packet);
                
                // Mulai urutan animasi
                setTimeout(() => {
                    packet.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    Object.assign(packet.style, {
                        top: `${endY}%`,
                        left: `${endX}%`
                    });
                }, 50);
                
                // Hapus paket setelah animasi selesai
                setTimeout(() => {
                    packet.style.opacity = '0';
                    setTimeout(() => packet.remove(), 300);
                }, duration - 300);
            };
            
            // Buat paket dalam interval waktu
            setInterval(createPacket, 800);
        };
        
        // Tambahkan efek hover untuk item fitur
        const setupFeatureInteractions = () => {
            const features = visual.querySelectorAll('.security-features li');
            features.forEach(feature => {
                feature.addEventListener('mouseenter', () => {
                    const icon = feature.querySelector('.feature-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.boxShadow = '0 0 10px rgba(77, 184, 255, 0.7)';
                    }
                });
                
                feature.addEventListener('mouseleave', () => {
                    const icon = feature.querySelector('.feature-icon');
                    if (icon) {
                        icon.style.transform = '';
                        icon.style.boxShadow = '';
                    }
                });
            });
        };
        
        // Inisialisasi semua peningkatan visual keamanan siber
        createAdditionalNodes();
        createDynamicPackets();
        setupFeatureInteractions();
        
        // Tambahkan efek interaktif keseluruhan saat hover
        visual.addEventListener('mouseenter', () => {
            visual.style.boxShadow = '0 0 40px rgba(0, 40, 80, 0.4)';
            visual.style.transform = 'translateY(-3px)';
            
            const encryptionLayer = visual.querySelector('.encryption-layer');
            if (encryptionLayer) {
                encryptionLayer.style.opacity = '1';
                encryptionLayer.style.animationDuration = '5s';
            }
        });
        
        visual.addEventListener('mouseleave', () => {
            visual.style.boxShadow = '';
            visual.style.transform = '';
            
            const encryptionLayer = visual.querySelector('.encryption-layer');
            if (encryptionLayer) {
                encryptionLayer.style.opacity = '0.8';
                encryptionLayer.style.animationDuration = '10s';
            }
        });
    }
    };
