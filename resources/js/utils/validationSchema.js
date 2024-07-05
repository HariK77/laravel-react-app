import * as Yup from "yup";

export const registrationSchema = () => {
    return Yup.object().shape({
        name: Yup.string().label("Name").required(),
        email: Yup.string().email().label("Email").required(),
        gender: Yup.string().label("Gender").required(),
        profile_image: Yup.mixed()
            .label("Profile Image")
            .required()
            .test(
                "fileSize",
                "File too large",
                (value) => !value || (value && value.size <= 1024 * 1024 * 2)
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                    !value ||
                    (value && ["image/jpeg", "image/png"].includes(value.type))
            ),
        speaking_languages: Yup.array()
            .min(1, "Select at least one language")
            .label("Speaking Languages")
            .required(),
        password: Yup.string().label("Password").required(),
        password_confirmation: Yup.string()
            .label("Password Confirmation")
            .required()
            .oneOf([Yup.ref("password")], "Passwords must match"),
    })
};


export const profileSchema = () => {
    return Yup.object().shape({
        name: Yup.string().label("Name").required(),
        email: Yup.string().email().label("Email").required(),
        gender: Yup.string().label("Gender").required(),
        profile_image: Yup.mixed().nullable()
            .label("Profile Image")
            .test(
                "fileSize",
                "File too large",
                (value) => !value || (value && value.size <= 1024 * 1024 * 2)
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                    !value ||
                    (value && ["image/jpeg", "image/png"].includes(value.type))
            ),
        speaking_languages: Yup.array()
            .min(1, "Select at least one language")
            .label("Speaking Languages")
            .required(),
    })
};


export const addVideoAlbumSchema = () => {
    return Yup.object().shape({
        name: Yup.string().label("Album name").required(),
        released_at: Yup.string().label("Released at").required(),
        thumbnail: Yup.mixed()
            .label("Thumbnail")
            .required()
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                    !value ||
                    (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
            ),
    })
};

export const addVideoTrackSchema = () => {
    return Yup.object().shape({
        name: Yup.string().label("Name").required(),
        video_album_id: Yup.number().label("Video Album").required(),
        video: Yup.mixed()
            .label("Video")
            .required()
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                    !value ||
                    (value && ['video/x-matroska', 'video/mp4'].includes(value.type))
            ),
        thumbnail: Yup.mixed()
            .label("Thumbnail")
            .required()
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                    !value ||
                    (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
            ),
    })
};
