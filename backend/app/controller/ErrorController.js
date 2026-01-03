export const ErrorHandler = (req, res) => {
    console.log(`404 Not Found: ${req.originalUrl}`);  // Logs the requested URL for debugging
    res.status(404).send({message: "Error: Status 404"}); // Custom 404 page
}