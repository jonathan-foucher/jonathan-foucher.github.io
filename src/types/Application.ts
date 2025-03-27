import type { Component } from 'vue'

export default interface Application {
  name: string
  component: Component
  width: number
  height: number
}
