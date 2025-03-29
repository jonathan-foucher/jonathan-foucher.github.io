import AboutProjectApp from '@/components/desktop/apps/AboutProjectApp.vue'
import IntroductionPdf from '@/components/desktop/apps/IntroductionPdf.vue'
import ResumePdf from '@/components/desktop/apps/ResumePdf.vue'

export class ApplicationList {
  static readonly ABOUT_PROJECT = {
    name: 'about-project.app-title',
    component: AboutProjectApp,
    width: 400,
    height: 380,
  }

  static readonly INTRODUCTION_PDF = {
    name: 'introduction-pdf.app-title',
    component: IntroductionPdf,
    width: 600,
    height: 380,
  }

  static readonly RESUME_PDF = {
    name: 'resume-pdf.app-title',
    component: ResumePdf,
    width: 800,
    height: 600,
  }
}
