import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select, 
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery } 
    from "@mui/material"

import { 
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close } 
    from "@mui/icons-material"
import { setMode ,setLogout} from "state"
import FlexBetween from "components/FlexBetween"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export const  Nav=()=>{
    const [isMobileMenuToggled, setIsMobileToggled]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user= useSelector(state=>state.user)
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
    const theme =useTheme()

    const neutralLight= theme.palette.neutral.light
    const dark= theme.palette.neutral.dark
    const background=theme.palette.background.default
    const primary=theme.palette.primary.light
    const alt=theme.palette.background.alt

    const fullName=`${user.firstName} ${user.lastName}`

    return(
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color='primary'
                onClick={()=>navigate('/home')}
                sx={{
                    "&:hover": {
                        color: primary,
                        cursor: "pointer",
                      },
                }}
                >

                </Typography>
            </FlexBetween>
        </FlexBetween>
    )
}