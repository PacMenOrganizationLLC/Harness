import { FC, FormEvent } from "react"
import Event from "../../models/Event"
import { CustomModal, ModalButton, useModal } from "../../components/CustomModal"
import { TextInput, useTextInput } from "../../components/forms/TextInput"
import { useAddEventMutation, useUpdateEventMutation } from "./eventHooks"
import { DateInput, useDateInput } from "../../components/forms/DateInput"


export const EventEditorModal: FC<{
  existingEvent?: Event,
  setSelectedEvent: (e?: Event) => void
}> = ({ existingEvent, setSelectedEvent }) => {
  const addEventMutation = useAddEventMutation();
  const updateEventMutation = useUpdateEventMutation();
  const nameControl = useTextInput(existingEvent?.name ?? "")
  const descriptionControl = useTextInput(existingEvent?.description ?? "")
  const imageFilenameControl = useTextInput(existingEvent?.imageFilename ?? "")
  const dayControl = useDateInput(existingEvent?.day ?? new Date())
  //TODO: make a useDateInput or take what 
  const locationControl = useTextInput(existingEvent?.location ?? "")

  const eventEditorControls = useModal("Event Editor")

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingEvent ? (
        <button className="btn btn-outline-secondary"
          onClick={showModal}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-outline-info"
          onClick={showModal}>
          New
        </button>
      )
      }
    </div>
  )

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: Event = {
      id: existingEvent?.id ?? 0,
      name: nameControl.value,
      imageFilename: imageFilenameControl.value,
      description: descriptionControl.value,
      day: new Date(),
      location: locationControl.value,
    }
    if (existingEvent) {
      updateEventMutation.mutate(newEvent)
    }
    else {
      addEventMutation.mutateAsync(newEvent).then(() => {

      })
    }
    setSelectedEvent(undefined)

    closeHandler();
  }

  const closeHandler = () => {
    nameControl.setValue("")
    imageFilenameControl.setValue("")
    descriptionControl.setValue("")
    //dayControl.setValue("")
    locationControl.setValue("")
    eventEditorControls.hide()
  }

  const canSubmit = nameControl.value !== "" && locationControl.value !== "" && dayControl.value !== new Date()
  return (
    <CustomModal ModalButton={ModalButton} controls={eventEditorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingEvent ? "Edit Event" : "New Event"}
          </div>
          <button className="btn-close"
            onClick={closeHandler}
            aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <TextInput control={nameControl}
              label="*Name"
              labelClassName="col-12" />
            <TextInput control={descriptionControl}
              label="Description"
              labelClassName="col-12" />
            <TextInput control={imageFilenameControl}
              label="Image Filename"
              labelClassName="col-12" />
            <DateInput control={dayControl}
              label="*Day"
              labelClassName="col-12" />
            <TextInput control={locationControl}
              label="*Location"
              labelClassName="col-12" />
            <div className="small">*Required</div>
            <div className="row text-center my-2">
              <div className="col">
                <button className="btn btn-secondary"
                  type="button"
                  onClick={closeHandler}>Close</button>
              </div>
              <div className="col">
                <button className="btn btn-primary"
                  disabled={!canSubmit}
                  type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  )
}
