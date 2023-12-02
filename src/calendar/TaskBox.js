// src/components/Calendar/TaskBox.js
import React, { useState } from "react";
import { format } from "date-fns";

const TaskBox = ({
  selectedDate,
  eventInput,
  onEventInputChange,
  onAddEvent,
  onClose,
  events,
  onEditEventTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState("");

  const taskExists =
    selectedDate &&
    events[format(selectedDate, "yyyy-MM")] &&
    events[format(selectedDate, "yyyy-MM")][format(selectedDate, "yyyy-MM-dd")];

  const handleEditEvent = () => {
    setIsEditing(true);
    setEditedEvent(
      events[format(selectedDate, "yyyy-MM")][
        format(selectedDate, "yyyy-MM-dd")
      ]
    );
  };

  const handleSaveEdit = () => {
    if (onEditEventTitle) {
      onEditEventTitle(selectedDate, editedEvent);
    }

    setIsEditing(false);
    onClose(true )
  };

  return (
    <div className="flex gap-4 mt-4">
      <div className="bg-slate-100 p-4 rounded-md">
        {selectedDate && (
          <div className="text-xl font-bold mb-4 border-b pb-2 flex justify-between">
            {format(selectedDate, "MMM d (eee)").toUpperCase()}
            {taskExists && (
              <>
                <span className="px-4 textBlue" onClick={handleEditEvent}>
                  <i className="fa-solid fa-pencil"></i>
                </span>
              </>
            )}
          </div>
        )}

        {selectedDate && taskExists ? (
          <div className="mt-4">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Edit event"
                  value={editedEvent}
                  onChange={(e) => setEditedEvent(e.target.value)}
                  className="p-2 rounded bg-gray-100"
                />
              </div>
            ) : (
              <div>
                <ul>
                  <li className="textBlue">
                    {
                      events[format(selectedDate, "yyyy-MM")][
                        format(selectedDate, "yyyy-MM-dd")
                      ]
                    }
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="textarea"
              placeholder="Set as a Reminder"
              value={eventInput}
              onChange={onEventInputChange}
              className="p-2 bg-gray-100"
            />
          </div>
        )}
      </div>
     {isEditing&&  <div className="flex flex-col gap-2 ">
        {taskExists ? (
          <button
            className="bg-green-300 text-white p-1 rounded  "
            onClick={handleSaveEdit}
          >
            <i class="fa-solid fa-check"></i>
          </button>
        ) : (
          <button
            className="bg-green-300 text-white p-1 rounded "
            onClick={onAddEvent}
          >
             <i class="fa-solid fa-check"></i>
          </button>
        )}
        <button
          className="border border-orange-200 text-orange-200  p-1 rounded "
          onClick={onClose}
        >
          <i class="fa-solid fa-eraser"></i>
        </button>
      </div>}
    </div>
  );
};

export default TaskBox;
