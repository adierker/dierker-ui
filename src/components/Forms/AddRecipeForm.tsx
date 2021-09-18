import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  Input,
  Radio,
  Button,
  FieldArray,
  IngredientsFieldArray,
} from 'components'
import { ADD_RECIPE_FORM_RESOLVER } from 'resolvers'

export const AddRecipeForm = (): ReactElement => {
  const [componentHasFinishedInit, setComponentHasFinishedInit] = useState<
    boolean | null
  >(null)

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ADD_RECIPE_FORM_RESOLVER),
  })

  const onSubmit = (data) => console.log(data)

  const {
    fields: descriptionFields,
    append: appendParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    control,
    name: 'descriptions',
  })

  const {
    fields: ingredientGroupingsFields,
    append: appendGrouping,
    remove: removeGrouping,
  } = useFieldArray({
    control,
    name: 'ingredientGroupings',
  })

  const {
    fields: instructionFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'instructions',
  })

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: 'notes',
  })

  useEffect(() => {
    if (descriptionFields.length < 1) {
      appendParagraph({})
    }
    if (instructionFields.length < 1) {
      appendStep({})
    }
    if (ingredientGroupingsFields.length < 1) {
      appendGrouping({})
    }
    setComponentHasFinishedInit(false)
  }, [appendParagraph, appendStep, appendGrouping, setComponentHasFinishedInit])

  // componentHasFinishedInit will start as null, then the appendParagraph/appendStep/appendGrouping
  // useEffect above will set it to false, which will trigger this useEffect,
  // and will set the focus to the first input on the page
  useEffect(() => {
    if (componentHasFinishedInit === false) {
      setFocus('name')
      setComponentHasFinishedInit(true)
    }
  }, [componentHasFinishedInit, setComponentHasFinishedInit])

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="name"
        label="Recipe name"
        error={errors.name}
        {...register('name')}
      />

      <Input
        id="path"
        label="Path/Route"
        error={errors.path}
        {...register('path')}
      />

      <Input
        id="url"
        label="Original recipe URL"
        error={errors.url}
        {...register('url')}
      />

      <hr className="border-t-3 border-drkr-black mt-3 mb-8" />

      <FieldArray
        fields={descriptionFields}
        fieldError={errors.descriptions}
        label="Descriptions"
        fieldName="descriptions"
        fieldKey="paragraph"
        appendFunction={appendParagraph}
        removeFunction={removeParagraph}
        buttonLabel="Add Paragraph"
        register={register}
        inputOrTextarea="textarea"
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <Input
        id="defaultServings"
        label="Default servings"
        error={errors.defaultServings}
        {...register('defaultServings')}
      />

      <Radio
        id="scalable"
        label="Scalable?"
        options={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
        error={errors.scalable}
        {...register('scalable', { required: true })}
      />

      <hr className="border-t-3 border-drkr-black mt-3 mb-8" />

      <IngredientsFieldArray
        ingredientGroupingsFields={ingredientGroupingsFields}
        register={register}
        control={control}
        fieldErrors={errors.ingredientGroupings}
        appendGrouping={appendGrouping}
        removeGrouping={removeGrouping}
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <FieldArray
        fields={instructionFields}
        fieldError={errors.instructions}
        label="Instructions"
        fieldName="instructions"
        fieldKey="step"
        appendFunction={appendStep}
        removeFunction={removeStep}
        buttonLabel="Add Step"
        register={register}
        inputOrTextarea="textarea"
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <FieldArray
        fields={noteFields}
        fieldError={errors.notes}
        label="Notes"
        fieldName="notes"
        fieldKey="note"
        appendFunction={appendNote}
        removeFunction={removeNote}
        buttonLabel="Add Note"
        register={register}
        inputOrTextarea="textarea"
        firstIsRemovable={true}
      />

      <hr className="border-t-3 border-drkr-black mt-9 mb-8" />

      <Button
        type="submit"
        text="Submit Recipe"
        className="focus-visible:bg-drkr-black mt-12 w-full !block"
      />
    </form>
  )
}
