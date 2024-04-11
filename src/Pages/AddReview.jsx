import React from "react";
import { Input, SubmitButton } from "../Components/components";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {review,storage} from "../Appwrite/Services/services"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { nanoid } from '@reduxjs/toolkit'


function AddReview() {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");
  const [hasSuggestions, setHasSuggestions] = React.useState(false);
  const [addReviewState,setAddReviewState] = React.useState({
    reviewID:nanoid(),
    rentalImages:null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // address from store
  const sliceAddress = useSelector((state) => state.address.searchAddress);
  // user from store
  const user = useSelector((state) => state.auth.userEmail);
  React.useEffect(() => {
    if (sliceAddress && sliceAddress.trim()) {
      setAddressValue(sliceAddress);
    }
    return () => {
      setAddressValue("");
    };
  }, []);
  // for address search
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddressValue(results[0]["formatted_address"]);
  };
  // form submission
  const submitForm=async (data)=>{
    try {
      setError(false);
      setSubmissionError(null);
      setLoading(true);
      // checking for address value
      if (addressValue.trim() === "") {
        setError("Address is required");
        document.getElementById("addressInput").focus();
        return;
      }
      let isImage = false;
      // uploading images
      if(addReviewState.rentalImages){
        await storage.addFile({id:addReviewState.reviewID,file:addReviewState.rentalImages})
        isImage = true;
      }
      

      const reviewObject = {
        neighbourhood: data.neighbourhood,
        isImage: isImage,
        amenities: data.amenities,
        owner: data.owner,
        address: addressValue,
        ...(data.rent && {rent: data.rent}),
        ...(data.comments && {comments: data.comments}),
        ...(user && {user: user}),
      }
      await review.createReview(addReviewState.reviewID,reviewObject);
      setOpen(true);
    } catch (error) {
      setSubmissionError(error.message);
    } finally {
      setLoading(false);
      setAddressValue("");
      reset();
      setAddReviewState({
        reviewID:nanoid(),
        rentalImages:null,
      });
      
    }
  };
  const hideSnackBar = (_, reason) => {
    if (reason === "timeout") {
      setOpen(false);
      return;
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen  text-white mx-auto max-w-prose mt-4 gap-4 p-4 bg-[#0a0a0a] ">
      <h1 className="text-center font-bold text-2xl ">Add Review</h1>
      {submissionError && (
        <p className="text-rose-600 text-center font-semibold my-2" >{submissionError}</p>
      )}
      <div className="flex flex-col w-full ">
        <PlacesAutocomplete
          value={addressValue}
          onChange={setAddressValue}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="relative">
              <label htmlFor="addressInput">Full Address</label>
              <input
                autoFocus
                {...getInputProps({
                  placeholder: "Enter full address",
                  className: `outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] ${
                    error ? "border-rose-500 caret-rose-500" : "border-theme "
                  } bg-gray-300 px-2 py-2 focus:ring-gray-100 focus:ring-1 capitalize`,
                  id: "addressInput",
                  onFocus: () => setHasSuggestions(true),
                })}
              />
              <div className="absolute left-0 w-full z-10">
                {hasSuggestions && suggestions.length > 0 && (
                  <div className=" border border-gray-300 rounded-md shadow-md mt-2 overflow-auto h-[25vh] bg-[#000] ">
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#4071d0"
                          : "#0a0a0a",
                        color: "white",
                        border: "1px solid #4071d0",
                      };

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {error && <span className="text-red-500 text-sm ">{error}</span>}
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-4"
        >
          {/* rent amount */}
          <div className="mt-4">
            <label htmlFor="rent">
              Rent <span className="text-xs italic">(opt.)</span>
            </label>
            <Input
              placeholder="Rent Amount"
              id="rent"
              type="float"
              className={`outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1`}
              register={register}
              name={"rent"}
              extraFormFeatures={{
                required: false,
                pattern: {
                  value: /^\d+$/,
                  message: "No characters/decimals allowed",
                },
                min: {
                  value: 0,
                  message: "Rent amount must be greater than 0",
                },
                max: {
                  value: 9999999,
                  message: "Rent amount should not exceed 9999999",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="rent"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">{message}</p>
                );
              }}
            />
          </div>
          {/* neighbourhood rating */}
          <div>
            <Input
              className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1"
              name={"neighbourhood"}
              placeholder={"Enter a value from 1 to 5"}
              type={"float"}
              label={"Neighbourhood Rating"}
              register={register}
              extraFormFeatures={{
                required: "Required",
                pattern: {
                  value: /^[1-5]$/,
                  message: "Please enter a valid rating",
                },
                min: {
                  value: 1,
                  message: "Rating must be between 1 and 5",
                },
                max: {
                  value: 5,
                  message: "Rating must be between 1 and 5",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="neighbourhood"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">
                    
                    {message}
                  </p>
                );
              }}
            />
          </div>
          <div>
            <Input
              className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1"
              name={"amenities"}
              placeholder={"Enter a value from 1 to 5"}
              type={"float"}
              label={"Amenities Rating"}
              register={register}
              extraFormFeatures={{
                required: "Required",
                pattern: {
                  value: /^[1-5]$/,
                  message: "Please enter a valid rating",
                },
                min: {
                  value: 1,
                  message: "Rating must be between 1 and 5",
                },
                max: {
                  value: 5,
                  message: "Rating must be between 1 and 5",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="amenities"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">
                    
                    {message}
                  </p>
                );
              }}
            />
          </div>
          <div>
            <Input
              className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1"
              name={"owner"}
              placeholder={"Enter a value from 1 to 5"}
              type={"float"}
              label={"Owner Rating"}
              register={register}
              extraFormFeatures={{
                required: "Required",
                pattern: {
                  value: /^[1-5]$/,
                  message: "Please enter a valid rating",
                },
                min: {
                  value: 1,
                  message: "Rating must be between 1 and 5",
                },
                max: {
                  value: 5,
                  message: "Rating must be between 1 and 5",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="owner"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">
                    
                    {message}
                  </p>
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="commentArea">
              Comment <span className="text-xs italic">(opt.)</span>
            </label>
            <textarea
              className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1"
              name={"comments"}
              id="commentArea"
              {...register("comments", {
                required: false,
                maxLength: {
                  value: 300,
                  message: "Comment must not exceed 300 characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="comments"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">
                    
                    {message}
                  </p>
                );
              }}
            />
          </div>
          {/*  image upload */}
          <input
            type="file"
            id="rentalImage"
            name="rentalImage"
            accept="image/jpg,image/jpeg,image/png"
            className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] mb-2 bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-1"
            capture="environment"
            onChange={(e)=>{
              setAddReviewState({...addReviewState,rentalImages:e.target.files?.[0]})              
            }}
          />

          {/* submit */}
          <SubmitButton loading={loading} />
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={hideSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={()=>{setOpen(false)}} sx={{ width: "100%" }}>
          Review added successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddReview;
