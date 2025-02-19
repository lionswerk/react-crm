import React, { ChangeEvent, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    TextField,
    AccordionDetails,
    Accordion,
    AccordionSummary,
    Typography,
    Box,
    TextareaAutosize,
    MenuItem,
    Tooltip,
    Button,
    Input,
    Avatar,
    IconButton,
    Stack
} from '@mui/material'
// import { makeStyles } from '@mui/styles'
// import isEmail from 'validator/lib/isEmail'

import '../../styles/style.css'
import { UsersUrl } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaArrowAltCircleDown, FaArrowDown, FaTimes, FaUpload } from 'react-icons/fa'
import { AntSwitch, CustomSelectField, CustomSelectTextField, RequiredTextField } from '../../styles/CssStyled'

type FormErrors = {
    email?: string[];
    role?: string[];
    phone?: string[];
    alternate_phone?: string[];
    address_line?: string[];
    street?: string[];
    city?: string[];
    state?: string[];
    pincode?: string[];
    country?: string[];
    profile_pic?: string[];
    has_sales_access?: string[];
    has_marketing_access?: string[];
    is_organization_admin?: string[];
};
interface FormData {
    email: string,
    role: string,
    phone: string,
    alternate_phone: string,
    address_line: string,
    street: string,
    city: string,
    state: string,
    pincode: string,
    country: string,
    profile_pic: string | null,
    has_sales_access: boolean,
    has_marketing_access: boolean,
    is_organization_admin: boolean


}
export function AddUsers() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [error, setError] = useState(false)
    // const [desc, setDesc] = useState('')

    const [msg, setMsg] = useState('')
    const [responceError, setResponceError] = useState(false)
    // const [assign, setAssignTo] = useState('')
    // const [source, setSource] = useState('')
    // const [status, setStatus] = useState('')



    // const handleChange = (target, key) => {
    //   if (target.name === 'assign_to') {
    //     const newKey = []
    //     newKey.push((key.key).replace(/[^0-9]/g, '', '$'))
    //     val.assigned_to = JSON.stringify(newKey)
    //     setAssignTo(target.value)
    //   } else if (target.name === 'status') {
    //     val.status = target.value
    //     setStatus(target.value)
    //   } else if (target.name === 'source') {
    //     val.source = target.value
    //     setSource(target.value)
    //   } else if (target.name === 'industry') {
    //     val.industry = target.value
    //   }
    // }

    // const tagsHandle = (event, value) => {
    //   val.tags = JSON.stringify(value)
    // }

    // const HandleDesc = (nextValues) => {
    //   val.description = nextValues
    //   setDesc(nextValues)
    // }

    // const assignToHandle = (event, value) => {
    //   const newKey = []
    //   let stringVal = ''
    //   value.map((item) => {
    //     stringVal =
    //       newKey.push(item.id.toString())
    //   })
    //   val.assigned_to = JSON.stringify(newKey)
    // }

    // const validatation = () => {
    //     let flag = true
    //     if (!(Object.prototype.hasOwnProperty.call(val, 'salutation')) || val.title === '') {
    //         flag = false
    //         setError('*required  field')
    //         setMsg('salutation')
    //     } else if (!(Object.prototype.hasOwnProperty.call(val, 'first_name')) || val.opportunity_amount === '') {
    //         flag = false
    //         setError('*required field')
    //         setMsg('first_name')
    //     } else if (!(Object.prototype.hasOwnProperty.call(val, 'last_name')) || val.first_name === '') {
    //         setError('*required field')
    //         setMsg('last_name')
    //         flag = false
    //     } else if (!(Object.prototype.hasOwnProperty.call(val, 'title')) || val.first_name === '') {
    //         setError('*required field')
    //         setMsg('title')
    //         flag = false
    //     } else if ((Object.prototype.hasOwnProperty.call(val, 'primary_email'))) {
    //         const validEmail = isEmail(val.primary_email)
    //         if (validEmail === false) {
    //             setError('*email is not valid')
    //             setMsg('primary_email')
    //             flag = false
    //         }
    //     } else if ((Object.prototype.hasOwnProperty.call(val, 'secondary_email'))) {
    //         const validEmail = isEmail(val.secondary_email)
    //         if (validEmail === false) {
    //             setError('*email is not valid')
    //             setMsg('secondary_email')
    //             flag = false
    //         }
    //     } else if (!(Object.prototype.hasOwnProperty.call(val, 'address_line')) || val.address_line === '') {
    //         setError('*required address field')
    //         setMsg('address_line')
    //         flag = false
    //     } else {
    //         setError('')
    //         setMsg('')
    //     }
    //     return flag
    // }

    const handleChange = (e: any) => {
        const { name, value, files, type, checked } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files?.[0] || null });
        }
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
        // setValidationErrors(({ ...validationErrors, [name]: '' }));
        // setErrors({});
        // const newValue = type === 'checkbox' ? checked : value;
        // setFormData({ ...formData, [name]: newValue });
    };

    const backbtnHandle = () => {
        navigate('/app/users')
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    }
    const [errors, setErrors] = useState<FormErrors>({});
    const [profileErrors, setProfileErrors] = useState<FormErrors>({});
    const [userErrors, setUserErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        email: '',
        role: 'ADMIN',
        phone: '',
        alternate_phone: '',
        address_line: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        profile_pic: null,
        has_sales_access: false,
        has_marketing_access: false,
        is_organization_admin: false

    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profile_pic: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };


    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        org: localStorage.getItem('org')
    }
    const submitForm = () => {
        // console.log('Form data:', data);

        const data = {
            email: formData.email,
            role: formData.role,
            phone: formData.phone,
            alternate_phone: formData.alternate_phone,
            address_line: formData.address_line,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
            profile_pic: formData.profile_pic,
            has_sales_access: formData.has_sales_access,
            has_marketing_access: formData.has_marketing_access,
            is_organization_admin: formData.is_organization_admin
        }

        fetchData(`${UsersUrl}/`, 'POST', JSON.stringify(data), headers)
            .then((res: any) => {
                console.log('Form data:', res);
                if (!res.error) {
                    // setResponceError(data.error)
                    // navigate('/contacts')profile_errors

                    resetForm()
                    navigate('/app/users')
                }
                if (res.error) {
                    // profile_errors
                    // user_errors
                    setError(true)
                    setProfileErrors(res?.errors?.profile_errors)
                    setUserErrors(res?.errors?.user_errors)
                }
            })
            .catch(() => {
            })
    };
    const resetForm = () => {
        setFormData({
            email: '',
            role: 'ADMIN',
            phone: '',
            alternate_phone: '',
            address_line: '',
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            profile_pic: null,
            has_sales_access: false,
            has_marketing_access: false,
            is_organization_admin: false
        });
        setProfileErrors({})
        setUserErrors({})
    }
    const onCancel = () => {
        resetForm()
    }
    const module = 'Users'
    const crntPage = 'Add Users'
    const backBtn = 'Back To Users'

    const inputStyles = {
        display: 'none',
    };
    const customArrowStyles = {
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '8px', // Adjust the right position based on your design
            width: '0',
            height: '0',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '6px solid #888', // Set the desired grey color
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
        },
    };
    // console.log(formData.profile_pic, 'formData.profile_pic')
    return (
        <Box sx={{ mt: '60px' }}>
            <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
            <Box sx={{ mt: "100px" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                >
                                    <div className='typography'>
                                        <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                                            User Information
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353' ,mb:1}}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Email</div>
                                                <RequiredTextField
                                                    required
                                                    name='email'
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.email?.[0] || !!userErrors?.email?.[0]}
                                                    helperText={profileErrors?.email?.[0] || userErrors?.email?.[0] || ''}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Role</div>
                                                <CustomSelectField
                                                    name='role'
                                                    select
                                                    value={formData.role}
                                                    className="custom-textfield"
                                                    InputProps={{
                                                        style: {
                                                            height: '40px',
                                                            maxHeight: '40px'
                                                        }
                                                    }}
                                                    onChange={handleChange}
                                                    sx={{ width: '70%' }}
                                                >
                                                    {['ADMIN', 'USER'].map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </CustomSelectField>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Phone Number</div>
                                                <Tooltip title="Number must starts with +91">
                                                    <RequiredTextField
                                                        name='phone'
                                                        id='outlined-error-helper-text'
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        style={{ width: '70%' }}
                                                        size='small'
                                                        error={!!profileErrors?.phone?.[0] || !!userErrors?.phone?.[0]}
                                                        helperText={profileErrors?.phone?.[0] || userErrors?.phone?.[0] || ''}
                                                    />
                                                </Tooltip>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Alternate Phone Number</div>
                                                <Tooltip title="Number must starts with +91">
                                                    <RequiredTextField
                                                        required
                                                        name='alternate_phone'
                                                        value={formData.alternate_phone}
                                                        onChange={handleChange}
                                                        style={{ width: '70%' }}
                                                        size='small'
                                                        error={!!profileErrors?.alternate_phone?.[0] || !!userErrors?.alternate_phone?.[0]}
                                                        helperText={profileErrors?.alternate_phone?.[0] || userErrors?.alternate_phone?.[0] || ''}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                        {/* <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Profile picture</div>
                                                <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                        <label htmlFor="avatar-input">
                                                            <input
                                                                id="avatar-input"
                                                                name="profile_pic"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e: any) => {
                                                                    handleFileChange(e);
                                                                    handleChange(e);
                                                                }}
                                                                style={inputStyles}
                                                            />
                                                            <IconButton
                                                                component="span"
                                                                color="primary"
                                                                aria-label="upload avatar"
                                                            >
                                                                <FaUpload fill='lightgrey' />
                                                            </IconButton>
                                                        </label>
                                                        <Box>  {formData.profile_pic !== null ?
                                                            <Box sx={{ position: 'relative' }}>
                                                                <Avatar src={formData.profile_pic || ''} />
                                                                <FaTimes style={{ position: 'absolute', marginTop: '-45px', marginLeft: '25px', fill: 'lightgray', cursor: 'pointer' }}
                                                                    onClick={() => setFormData({ ...formData, profile_pic: null })} />
                                                            </Box> : ''}
                                                        </Box>
                                                        {formData.profile_pic && <Typography sx={{ color: '#d32f2f', fontSize: '12px', ml: '-70px', mt: '40px' }}>{profileErrors?.profile_pic?.[0] || userErrors?.profile_pic?.[0] || ''}</Typography>}
                                                    </Stack>
                                                </Stack>


                                                {/* <label htmlFor='icon-button-file' style={{backgroundColor:'grey'}}>
                                                    <Input
                                                        id='icon-button-file'
                                                        type='file'
                                                        // ref={inputFileRef}
                                                        sx={{
                                                            display: 'table-caption'
                                                        }}
                                                    //     onChange={handleChange}
                                                    // name='profile_pic'
                                                    />
                                                    <Button
                                                        variant='outlined'
                                                        sx={{
                                                            width: '147px',
                                                            height: '42px',
                                                            position: 'relative',
                                                            top: '-21px'
                                                        }}
                                                    // disableRipple
                                                    // disableFocusRipple
                                                    // disableTouchRipple
                                                    // onClick={() => inputFileRef.current.click()}
                                                    >
                                                    <IconButton type='file' onChange={handleChange}
                                                    name='profile_pic' >
                                                        <Avatar src={formData.profile_pic}></Avatar></IconButton>
                                                         Upload Files 
                                                     </Button> 
                                                </label> 
                                                 <TextField
                                                    type="file"
                                                    onChange={handleChange}
                                                    name='profile_pic'
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!errors.profile_pic || !!errors?.profile_pic?.[0]}
                                                    helperText={errors.profile_pic || errors?.profile_pic?.[0] || ''}
                                                /> 
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Sales Access</div>
                                                <AntSwitch
                                                    name='has_sales_access'
                                                    checked={formData.has_sales_access}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Marketing Access</div>
                                                <AntSwitch
                                                    name='has_marketing_access'
                                                    checked={formData.has_marketing_access}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Organization Admin</div>
                                                <AntSwitch
                                                    name='is_organization_admin'
                                                    checked={formData.is_organization_admin}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div> */}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* Email Information */}
                        {/* <div className='leadContainer'>
                            <Accordion style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                >
                                    <div
                                        className='typography'
                                    >
                                        <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Email Information</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353' }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>First Name</div>
                                                <TextField
                                                    error={msg === 'address_line'}
                                                    name='address_line'
                                                    id='outlined-error-helper-text'
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                    required={!!(msg === 'address_line' || msg === 'required')}
                                                    helperText={
                                                        msg === 'address_line' || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Last Name</div>
                                                <TextField
                                                    name='city'
                                                    error={!!(msg === 'city' || msg === 'required')}
                                                    id='outlined-error-helper-text'
                                                    // onChange={onChange} style={{ width: '70%' }}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    helperText={
                                                        (error && msg === 'city') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Title</div>
                                                <TextField
                                                    id='outlined-error-helper-text'
                                                    error={!!(msg === 'street' || msg === 'required')}
                                                    name='street'
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                    helperText={
                                                        (error && msg === 'street') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Primary Email</div>
                                                <TextField
                                                    name='state'
                                                    error={!!(msg === 'state' || msg === 'required')}
                                                    id='outlined-error-helper-text'
                                                    // onChange={onChange} style={{ width: '70%' }}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    helperText={
                                                        (error && msg === 'state') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Secondary Email</div>
                                                <TextField
                                                    id='outlined-error-helper-text'
                                                    error={!!(msg === 'street' || msg === 'required')}
                                                    name='street'
                                                    // onChange={onChange} style={{ width: '70%' }}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    helperText={
                                                        (error && msg === 'street') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Mobile Number</div>
                                                <TextField
                                                    name='state'
                                                    error={!!(msg === 'state' || msg === 'required')}
                                                    id='outlined-error-helper-text'
                                                    // onChange={onChange}
                                                    style={{ width: '70%' }}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    helperText={
                                                        (error && msg === 'state') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Secondary Number</div>
                                                <TextField
                                                    id='outlined-error-helper-text'
                                                    error={!!(msg === 'street' || msg === 'required')}
                                                    name='street'
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                    helperText={
                                                        (error && msg === 'street') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Fax</div>
                                                <TextField
                                                    name='state'
                                                    error={!!(msg === 'state' || msg === 'required')}
                                                    id='outlined-error-helper-text'
                                                    // onChange={onChange} style={{ width: '70%' }}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.fieldHeight
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    helperText={
                                                        (error && msg === 'state') || msg === 'required'
                                                            ? error
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div> */}
                        {/* Address Details */}
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                >
                                    <div className='typography'>
                                        <Typography
                                            style={{ marginBottom: '15px', fontWeight: 'bold' }}
                                        >
                                            Address
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353',mb:1 }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Address Lane</div>
                                                <TextField
                                                    required
                                                    name='address'
                                                    value={formData.address_line}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.address_line?.[0] || !!userErrors?.address_line?.[0]}
                                                    helperText={profileErrors?.address_line?.[0] || userErrors?.address_line?.[0] || ''}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Street</div>
                                                <TextField
                                                    required
                                                    name='street'
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.street?.[0] || !!userErrors?.street?.[0]}
                                                    helperText={profileErrors?.street?.[0] || userErrors?.street?.[0] || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>City</div>
                                                <TextField
                                                    required
                                                    name='city'
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.city?.[0] || !!userErrors?.city?.[0]}
                                                    helperText={profileErrors?.city?.[0] || userErrors?.city?.[0] || ''}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>State</div>
                                                <TextField
                                                    required
                                                    name='state'
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.state?.[0] || !!userErrors?.state?.[0]}
                                                    helperText={profileErrors?.state?.[0] || userErrors?.state?.[0] || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Pincode</div>
                                                <TextField
                                                    required
                                                    name='pincode'
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.pincode?.[0] || !!userErrors?.pincode?.[0]}
                                                    helperText={profileErrors?.pincode?.[0] || userErrors?.pincode?.[0] || ''}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Country</div>
                                                <TextField
                                                    required
                                                    name='country'
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    error={!!profileErrors?.country?.[0] || !!userErrors?.country?.[0]}
                                                    helperText={profileErrors?.country?.[0] || userErrors?.country?.[0] || ''}
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* Business Hours */}
                        {/* <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                >
                                    <div className='typography'>
                                        <Typography
                                            style={{ marginBottom: '15px', fontWeight: 'bold' }}
                                        >
                                            Business Hours
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353' }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div>
                                            <div className='fieldSubContainer' style={{ marginLeft: '4.8%' }}>
                                                <div className='fieldTitle'>Business Hours</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                    {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div> */}
                        {/* Preferences */}
                        {/* <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                >
                                    <div className='typography'>
                                        <Typography
                                            style={{ marginBottom: '15px', fontWeight: 'bold' }}
                                        >
                                            Preferences
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353' }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Default Page After Login</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                    {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Persone Name Format</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                    {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Prefferred Currency</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                     {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Digit Grouping Pattern</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                    {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Digit Grouping Seperator</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                     {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Number of Currency Decimals</div>
                                                <TextField
                                                    name='lead_source'
                                                    select
                                                    // onChange={onChange}
                                                    // InputProps={{
                                                    //     classes: {
                                                    //         root: textFieldClasses.root
                                                    //     }
                                                    // }}
                                                    className="custom-textfield"
                                                    style={{ width: '70%' }}
                                                >
                                                 {state.roles && state.roles.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} 
                                                </TextField>
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div> */}
                        {/* Signature Block */}
                        {/* <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                >
                                    <div className='typography'>
                                        <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Signature Block</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '100%', color: '#1A3353' }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='DescriptionDetail'>
                                            <div className='descriptionSubContainer'>
                                                <div className='descriptionTitle'>Signature</div>
                                                <TextareaAutosize
                                                    aria-label='minimum height'
                                                    name='description'
                                                    minRows={8}
                                                    // defaultValue={state.editData && state.editData.description ? state.editData.description : ''}
                                                    // onChange={onChange} 
                                                    style={{ width: '70%', padding: '5px' }}
                                                    placeholder='Add Description'
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div> */}
                    </div>
                </form>
            </Box>
        </Box>
    )
}
