import type { Component } from 'vue'

export default interface Application {
  name: string
  component: Component
  width: string
  height: string
}
