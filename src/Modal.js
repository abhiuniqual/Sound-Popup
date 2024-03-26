import React, { useState, forwardRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useBeep from "./useBeep";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  Rating,
  TextField,
} from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const playBeep = useBeep();

  const handleClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
      review: Yup.string().required("Review is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      setIsOpen(false);
      resetForm();
    },
  });

  const handleOpen = () => {
    setIsOpen(true);
    playBeep();
  };

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight={500}>
          Sound Popup with React + MUI
        </Typography>
        <Button sx={{ mt: 1.5 }} variant="contained" onClick={handleOpen}>
          🎉Open Sound Popup 🎉
        </Button>
      </Box>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={500}>🔊 Sound Popup</Typography>
            <IconButton onClick={handleClose}>
              <MdOutlineClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="body1">
                How do you like this sound? 😊
              </Typography>
              <Rating
                sx={{ mt: 0.5 }}
                name="rating"
                value={formik.values.rating}
                onChange={(event, newValue) => {
                  formik.setFieldValue("rating", newValue);
                }}
              />
              {formik.touched.rating && formik.errors.rating ? (
                <Typography variant="error">
                  ⚠️{formik.errors.rating}
                </Typography>
              ) : null}
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                Leave a review:
              </Typography>
              <TextField
                fullWidth
                sx={{ mt: 0.5 }}
                type="text"
                multiline
                rows={3}
                value={formik.values.review}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="review"
                placeholder="Write your review here..."
              />
              {formik.touched.review && formik.errors.review ? (
                <Typography variant="error">
                  ⚠️{formik.errors.review}
                </Typography>
              ) : null}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit 🚀
                </Button>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Popup;
