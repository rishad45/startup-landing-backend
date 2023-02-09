const express = require('express');
const router = express();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


const controller = require('../controllers/indexController');

router.post('/create-testimonials', upload.single('image'), controller.createTestimonial)

router.get('/view-testimonials', controller.viewTestimonials);

router.post('/edit-testimonial', controller.editTestimonial);

router.post('/delete-testimonial', controller.deleteTestimonial);

module.exports = router
