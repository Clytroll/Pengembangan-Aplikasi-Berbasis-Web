import { createApp } from 'vue'
import App from './App.vue'

// gaya asli P04-P06, isinya tidak diubah dan urutannya sama dengan <link> di profil.html P11:
// token -> dasar -> tata letak -> komponen -> responsif -> tema
import './tokens.css'
import './base.css'
import './layout.css'
import './komponen.css'
import './responsif.css'
import './tema.css'

createApp(App).mount('#app')
