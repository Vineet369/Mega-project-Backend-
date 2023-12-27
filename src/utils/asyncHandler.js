// BY PROMISES
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export {asyncHandler}





// // higher order async handler function 
// const asyncHandler = () => {}
// const asyncHandler = (fun) => {() => {}}
// const asyncHandler = (fun) = async() => {}




// // BY TRY CARTCH
// const asyncHandler = (fun) => async(req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }