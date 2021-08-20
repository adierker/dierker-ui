import classnames from 'classnames'

interface ButtonProps {
  text: string
  onClick: () => void
  customClasses?: string
}

const defaults = {
  flex: 'inline-flex justify-center',
  border: 'rounded-md border border-transparent shadow-sm',
  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drkr-green',
  padding: 'px-4 py-2',
  typography: 'text-xl headline-spaced',
  colors: 'bg-drkr-black text-drkr-white',
  hover: 'hover:bg-drkr-green',
}

const defaultClasses = Object.values(defaults).join(' ')

export const Button = ({
  text,
  onClick,
  customClasses,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(
        defaultClasses,
        customClasses
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}