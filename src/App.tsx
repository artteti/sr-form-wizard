import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { UserForm } from "./UserForm";
import { useMultistepForm } from "./useMultistepForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};
const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};
function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    } else {
      alert("Successful Account Creation!");
      console.log(data);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center text-blue-500 font-bold my-6">
        Form Fizard
      </h1>
      <div className="relative border border-gray-400 rounded-md m-6 p-6">
        <form onSubmit={onSubmitHandler}>
          <div className="absolute top-2 right-3">
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div className="mt-6 flex justify-end space-x-4">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="bg-blue-100 px-2 rounded-sm border border-blue-300 hover:bg-blue-200"
              >
                Back
              </button>
            )}
            {
              <button
                type="submit"
                className="bg-blue-100 px-2 rounded-sm border border-blue-300 hover:bg-blue-200"
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            }
          </div>
        </form>
      </div>
    </>
  );
}
export default App;
