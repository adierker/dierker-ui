import { ReactElement, useEffect } from 'react'

import { AnimalCard } from 'components'
import { Animal } from 'types'

interface AnimalCollectionProps {
  animals: Animal[]
}

export const AnimalCollection = ({
  animals,
}: AnimalCollectionProps): ReactElement => {
  return (
    <div className="flex justify-center flex-wrap mt-12">
      {animals &&
        animals.map((animal) => <AnimalCard animal={animal} key={animal.id} />)}
    </div>
  )
}
