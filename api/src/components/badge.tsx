import type { FC } from 'hono/jsx'
import { BadgeProps } from '~/types/builds'

export const Badge: FC<BadgeProps> = (props: BadgeProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110"
      height="26">
      <g>
        <rect width="64" height="26" fill="#5F5F5F" />
        <rect width="64" height="26" x="46" fill={props.color} />
      </g>
      <g fill="#fff" font-family="sans-serif" font-size="106" text-anchor="middle">
        <text x="240" y="172" lengthAdjust="spacing" textLength="240" transform="scale(0.1)">{props.build}</text>
        <text x="780" y="172" font-weight="bold" lengthAdjust="spacing" textLength="400"
          transform="scale(0.1)">{props.status}</text>
      </g>
    </svg>
  )
}
