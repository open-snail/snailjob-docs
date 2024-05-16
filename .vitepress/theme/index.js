// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import MyLayout from '../components/MyLayout.vue'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  ...DefaultTheme,
  Layout: MyLayout
}
