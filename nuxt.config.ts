// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import colors from 'tailwindcss/colors';

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{indigo.700}',
          inverseColor: '#ffffff',
          hoverColor: '{indigo.800}',
          activeColor: '{indigo.600}',
        },
        highlight: {
          background: '{slate.950}',
          focusBackground: '{slate.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{indigo.700}',
          contrastColor: '{slate.950}',
          inverseColor: '{indigo.700}',
          hoverColor: '{slate.100}',
          activeColor: '{slate.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/supabase',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  app: {
    head: {
      title: 'Recipe Book',
    },
    pageTransition: { name: 'page-transition', mode: 'out-in' },
  },
  css: ['primeicons/primeicons.css'],
  image: {
    domains: [
      'assets.bonappetit.com',
      'static01.nyt.com',
      'images.squarespace-cdn.com',
      'static1.squarespace.com',
      'res.cloudinary.com',
    ],
  },
  supabase: {
    redirect: false,
  },
  primevue: {
    usePrimeVue: true,
    options: {
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: false
        }
      },
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: colors.indigo,
          },
          screens: {
            print: { raw: 'print' },
          },
          keyframes: {
            wiggle: {
              '0%, 100%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
            },
          },
          animation: {
            wiggle: 'wiggle 0.3s ease-in-out infinite',
          },
        },
      },
    },
  },
});
