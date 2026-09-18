import GalleryItem from "../models/galleryItem.js"

export function createGalleryItems(req, res) {
    const user = req.body.user
    if(user == null){
        res.status(403).json({
            message : "Please login to create gallery items"
        })
        return
    }
    if(user.type != "admin"){
        res.status(403).json({
            message : "You are not authorized to create gallery items"
        })
        return
    }

    const galleryItem = req.body.item

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        () => {
            res.status(200).json({
                message : "Gallery Item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message : "Gallery Item creation failed"
            })
        }
    )
}

export function getGalleryItems(req, res) {
    GalleryItem.find().then(
        (list) => {
            res.status(200).json({
                list : list
            })
        }
    )
}