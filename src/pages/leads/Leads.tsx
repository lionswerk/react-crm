import styled from '@emotion/styled';
import { Avatar, AvatarGroup, Box, Button, Card, List, Stack, Tab, TablePagination, Tabs, Toolbar, Typography, Link } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { CustomTab, CustomToolbar } from '../../styles/CssStyled';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../components/FetchData';
import { getComparator, stableSort } from '../../components/Sorting';
import { Label } from '../../components/Label';
import { FaTrashAlt } from 'react-icons/fa';
import { DialogModal } from './DeleteModal';
import { LeadUrl } from '../../services/ApiUrls';
import { DeleteModal } from '../../components/DeleteModal';
import FormateTime from '../../components/FormateTime';
// import css from './css';
// import emotionStyled from '@emotion/styled';
// import { styled } from '@mui/system';
// import { css } from '@emotion/react';



// margin-bottom: -15px;
//   display: flex;
//   justify-content: space-between;
//   background-color: #1A3353;
export const CustomTablePagination = styled(TablePagination)`
.MuiToolbar-root {
  min-width: 100px;
}
.MuiTablePagination-toolbar {
  background-color: #f0f0f0;
  color: #333;
}
.MuiTablePagination-caption {
  color: #999;
}
'.MuiTablePagination-displayedRows': {
  display: none;
}
'.MuiTablePagination-actions': {
  display: none;
}
'.MuiTablePagination-selectLabel': {
  margin-top: 4px;
  margin-left: -15px;
}
'.MuiTablePagination-select': {
  color: black;
  margin-right: 0px;
  margin-left: -12px;
  margin-top: -6px;
}
'.MuiSelect-icon': {
  color: black;
  margin-top: -5px;
}
background-color: white;
border-radius: 1;
height: 10%;
overflow: hidden;
padding: 0;
margin: 0;
width: 39%;
padding-bottom: 5;
color: black;
margin-right: 1;
`;


export const Tabss = styled(Tab)({
  height: '34px',
  textDecoration: 'none',
  fontWeight: 'bold'
});

export const ToolbarNew = styled(Toolbar)({
  minHeight: '48px', height: '48px', maxHeight: '48px',
  width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#1A3353',
  '& .MuiToolbar-root': { minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important' },
  '@media (min-width:600px)': {
    '& .MuiToolbar-root': {
      minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important'
    }
  }
});
// export const formatDate = (dateString: any) => {
//   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString(undefined, options)
// }
// interface LeadList {
//   drawer: number;
// }
export default function LeadList(props: any) {
  // const {drawer}=props
  const navigate = useNavigate()
  const [value, setValue] = useState('Open');
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState([])
  const [valued, setValued] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  // const [value, setValue] = useState(0)
  const [initial, setInitial] = useState(true)
  const [openOffset, setOpenOffset] = useState(0)
  const [openValue, setOpenValue] = useState(1)
  const [closeOffset, setCloseOffset] = useState(0)
  const [closeValue, setCloseValue] = useState(1)
  // const [personName, setPersonName] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [lead, setLead] = useState('')
  const [storeData, SetStoreData] = useState([])
  const [order] = useState('asc')
  const [orderBy] = useState('calories')

  const [openLeads, setOpenLeads] = useState([])
  const [openLeadsCount, setOpenLeadsCount] = useState(0)
  const [closedLeads, setClosedLeads] = useState([])
  const [openClosedCount, setClosedLeadsCount] = useState(0)
  const [contacts, setContacts] = useState([])
  const [status, setStatus] = useState([])
  const [source, setSource] = useState([])
  const [companies, setCompanies] = useState([])
  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [countries, setCountries] = useState([])
  const [industries, setIndustries] = useState([])


  const [deleteLeadModal, setDeleteLeadModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    getLeads()
  }, [])
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  const getLeads = () => {
    fetchData(`${LeadUrl}/`, 'GET', null as any, headers)
      .then((res) => {
        // console.log(res, 'leads')
        if (!res.error) {
          if (initial) {
            setOpenLeads(res?.open_leads?.open_leads)
            setOpenLeadsCount(res?.open_leads?.leads_count)
            setClosedLeads(res?.close_leads?.close_leads)
            setClosedLeads(res?.close_leads?.leads_count)
            setContacts(res?.contacts)
            setStatus(res?.status)
            setSource(res?.source)
            setCompanies(res?.companies)
            setTags(res?.tags)
            setUsers(res?.users)
            setCountries(res?.countries)
            setIndustries(res?.industries)
            // setLeadsList();
            //   setLoading(false)
            // setInitial(false)
          }
          // else {
          //     // setContactList(Object.assign([], contacts, [data.contact_obj_list]))
          //     setContactList(prevContactList => prevContactList.concat(data.contact_obj_list));
          //     // setContactList(...contactList,data.contact_obj_list)
          //     setLoading(false)
          // }
        }
      })

  }

  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setValue(val)
  }
  //   <Box
  //   css={{
  //     width: 200,
  //     height: 200,
  //     borderWidth: '3px',
  //     borderColor: 'white',
  //     '&:hover': { backgroundColor: '#c51162' },
  //     '@media (min-width:0px)': { backgroundColor: '#3f51b5', borderStyle: 'dashed' },
  //     '@media (min-width:600px)': {
  //       backgroundColor: 'rgba(0, 0, 0, 0.87)',
  //       borderStyle: 'solid',
  //     },
  //     '@media (min-width:960px)': { backgroundColor: '#fff', borderStyle: 'dotted' },
  //   }}
  // >
  //   test case
  // </Box>


  // const Toolbar = emotionStyled('Toolbar')(({ css }) => css);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setValued(parseInt(event.target.value, 10))
  }
  const onAddHandle = () => {
    navigate('/app/leads/add-leads', {
      state: {
        detail: false,
        contacts, status, source, companies, tags, users, countries, industries
        // status: leads.status, source: leads.source, industry: leads.industries, users: leads.users, tags: leads.tags, contacts: leads.contacts 
      }
    })
  }
  const onDelete = (lead: any) => {
    setSelectedId(lead)
    setDeleteLeadModal(!deleteLeadModal)
  }


  const selectLeadList = (leadId: any) => {
    navigate(`/app/leads/lead-details`, { state: { leadId, detail: true, contacts, status, source, companies, tags, users, countries, industries } })
    // navigate('/app/leads/lead-details', { state: { leadId: leadItem.id, edit: storeData, value } })
  }
  const deleteLead = (deleteId: any) => {
    setDeleteLeadModal(true)
    setSelectedId(deleteId)
  }

  const deleteLeadModalClose = () => {
    setDeleteLeadModal(false)
    setSelectedId('')
  }
  const modalDialog = 'Are You Sure You want to delete selected Lead?'
  const modalTitle = 'Delete Lead'
  const deleteItem = () => {
    fetchData(`${LeadUrl}/${selectedId}/`, 'DELETE', null as any, headers)
      .then((res: any) => {
        // console.log('delete:', res);
        if (!res.error) {
          deleteLeadModalClose()
          getLeads()
        }
      })
      .catch(() => {
      })
  }

  const formatDate = (inputDate: string): string => {
    const currentDate = new Date();
    const targetDate = new Date(inputDate);
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference >= 12) {
      const yearsDifference = Math.floor(monthsDifference / 12);
      return `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
    } else if (monthsDifference >= 1) {
      return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
    } else if (daysDifference >= 1) {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
    }
  };
  const tag = ['account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'leading', 'account', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading', 'account', 'leading']
  return (
    <Box sx={{
      mt: '60px',
      // width: '1370px' 
    }}>

      <CustomToolbar
      // drawerWidth={props.drawer}
      // sx={Css.leadsCss}
      // sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#1A3353',minHeight:'48px',height:'48px',maxHeight:'48px','.& MuiToolbar-root':{minHeight:'48px',height:'48px',maxHeight:'48px'} }}
      >
        <Tabs defaultValue={value} onChange={handleChangeTab} sx={{ mt: '26px' }}>
          <CustomTab value="Open" label="Open"
            sx={{
              backgroundColor: value === 'Open' ? '#F0F7FF' : '#223d60',
              color: value === 'Open' ? '#3f51b5' : 'white',
            }} />
          <CustomTab value="Closed" label="Closed"
            sx={{
              backgroundColor: value === 'Closed' ? '#F0F7FF' : '#223d60',
              color: value === 'Closed' ? '#3f51b5' : 'white',
              ml: '5px',
            }}
          />
          {/* <div style={{
            height: '30px',
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            justifyItems: 'flex-end'
          }}
          >
            <div className='paginationContainer'>
              <TablePagination
                style={{ display: 'flex', flexDirection: 'row' }}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                component='div'
                labelRowsPerPage='Records Per Page'
                count={value === 0 ? leads.open_lead_count : leads.close_lead_count}
                rowsPerPage={rowsPerPage}
                page={page}
                size='small'
                sx={{
                  '.MuiTablePagination-displayedRows': {
                    display: 'none'
                  },
                  '.MuiTablePagination-actions': {
                    display: 'none'
                  },
                  '.MuiTablePagination-selectLabel': {
                    marginTop: '4px',
                    marginLeft: '-15px'
                  },
                  '.MuiTablePagination-select': {
                    color: 'black',
                    marginRight: '0px',
                    marginLeft: '-12px',
                    marginTop: '-6px'
                  },
                  '.MuiSelect-icon': {
                    color: 'black',
                    marginTop: '-5px'
                  },
                  backgroundColor: 'white',
                  borderRadius: 1,
                  height: '10%',
                  overflow: 'hidden',
                  p: 0,
                  m: 0,
                  width: '39%',
                  pb: 5,
                  color: 'black',
                  mr: 1
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Button
                size='small'
                sx={{
                  backgroundColor: 'white',
                  textTransform: 'lowercase',
                  borderRadius: '7px',
                  mr: 1,
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353', mr: 1 }} />
                <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', mr: 1 }}>
                  {
                    value === 0
                      ? `${openOffset + 1} to ${leads.open_lead_count > 0 ? valued : 0}`
                      : `${closeOffset + 1} to ${leads.close_lead_count > closeOffset + 10 ? closeOffset + 10 : 0}`
                  }
                </Typography>
                <ChevronRightIcon onClick={next} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353' }} />
              </Button>
              <div>
                <Button
                  variant='contained'
                  startIcon={<AddCircleOutlinedIcon style={{ fill: 'white' }} />}
                  onClick={onAddHandle}
                  style={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px', mr: 2, color: 'white' }}
                >
                  Add Lead
                </Button>
              </div>
            </div>
          </div> */}
          {/* <Tabs value={value} index={0}> */}
          {/* <div style={{ padding: '10px', marginTop: '5px' }}>
            {
              leads.open && leads.open
                ? stableSort(leads.open && leads.open, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <List
                    key={index}
                    sx={{
                      bgcolor: 'background.paper',
                      marginBottom: '-17px',
                      paddingTop: '0px',
                      boxShadow: 'none'
                    }}
                  >
                    <div style={{ padding: '10px', marginTop: '1px' }}>
                      <Card className={classes.card} style={{ boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ color: '#1A3353', fontSize: '13px', fontWeight: 'bold', padding: '10px', cursor: 'pointer' }} onClick={() => leadHandle(item)}>
                            {item.title}
                          </div>
                          <div
                            onClick={() => toggleDelete(item)}
                          >
                            <DeleteOutlineIcon color='inherit' style={{ fill: 'inherit', cursor: 'pointer' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ width: '80%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '10px' }}>
                            <div style={{ color: 'gray', fontSize: '12px', textTransform: 'capitalize', paddingBottom: '40px' }}>
                              {`${(item.country !== null) ? item.country : ''} source-${item.source !== null ? item.source : ''} status-${(item.status !== null) ? item.status : ''} Jan 9, 2014 `}
                            </div>
                            {
                              item.tags.map((tagData, index) => (
                                <Label tags={tagData} key={index} />
                              ))
                            }
                            {
                              item.assigned_to.map((assignItem, index) => (
                                assignItem.user_details.profile_pic
                                  ? <Avatar alt='Remy Sharp' src={assignItem.user_details.profile_pic} />
                                  : <Avatar alt='Remy Sharp' size='small' style={{ backgroundColor: deepOrange[500], color: 'white', textTransform: 'capitalize', marginTop: '-20px', marginLeft: '10px' }}>
                                    {assignItem.user_details.first_name.charAt(0)}
                                  </Avatar>
                              ))
                            }
                          </div>
                          <div style={{ color: 'gray', fontSize: '12px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            created on {formatDate(item.created_on)} by   &nbsp;<span>
                              {
                                item.created_by.user_details.profile_pic !== null
                                  ? <Avatar
                                    alt='Remy Sharp' src={staticImg}
                                    style={{
                                      height: '20px',
                                      width: '20px'
                                    }}
                                  />
                                  : <Avatar
                                    src='/broken-image.jpg'
                                    style={{
                                      height: '20px',
                                      width: '20px',
                                      marginTop: '-4px'
                                    }}
                                  />
                              }
                              &nbsp;
                            </span> &nbsp;&nbsp;{item.created_by.user_details.first_name}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </List>
                ))
                : ''
            }
            {
              isDelete
                ? <AlertDelete
                  lead={lead}
                  isDelete={isDelete}
                  onClose={onclose}
                  onDelete={onDelete}
                />
                : ''
            }
          </div> */}
          {/* </Tabs> */}
          {/* <Tabs value={value} index={1}> */}
          {/* <div style={{ padding: '10px', marginTop: '5px' }}>
            {
              leads.close
                ? leads.close.map((item, i) => (
                  <List
                    key={i}
                    sx={{
                      bgcolor: 'background.paper',
                      marginBottom: '-17px',
                      paddingTop: '0px'
                    }}
                  >
                    <div style={{ padding: '10px', marginTop: '1px' }}>
                      <Card className={classes.card} sx={{ boxShadow: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ color: '#5B5C63 ', fontSize: '13px', fontWeight: 'bold', textTransform: 'capitalize', padding: '10px', cursor: 'pointer' }} onClick={() => leadHandle(item)}>
                            {item.title}
                          </div>
                          <div onClick={() => toggleDelete(item)}>
                            <DeleteOutlineIcon color='inherit' style={{ fill: 'inherit', cursor: 'pointer' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ width: '80%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '10px' }}>
                            <div style={{ color: 'gray', fontSize: '12px', textTransform: 'capitalize', paddingBottom: '40px' }}>
                              {`${(item.country !== null) ? item.country : ''} source-${item.source !== null ? item.source : ''} status-${(item.status !== null) ? item.status : ''} Jan 9, 2014 `}
                            </div>
                            {
                              item.tags.map((tagData) => (
                                <Label tags={tagData} />
                              ))
                            }
                            <ListItemAvatar>
                              <AvatarGroup max={item.assigned_to.length}>
                                {
                                  item.assigned_to.map((assignItem) => (
                                    assignItem.user_details.profile_pic
                                      ? <Avatar alt='Remy Sharp' src={assignItem.user_details.profile_pic} />
                                      : <Avatar alt='Remy Sharp' size='small' style={{ backgroundColor: deepOrange[500], color: 'white', textTransform: 'capitalize', marginBottom: '70px', marginTop: '-20px', marginLeft: '3px' }}>
                                        {assignItem.user_details.first_name.charAt(0)}
                                      </Avatar>
                                  ))
                                }
                              </AvatarGroup>
                            </ListItemAvatar>
                          </div>
                          <div style={{ color: 'gray', fontSize: '12px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            created on {formatDate(item.created_on)} by   &nbsp;<span>
                              {
                                item.created_by.user_details.profile_pic !== null
                                  ? <Avatar
                                    alt='Remy Sharp' src={staticImg}
                                    style={{
                                      height: '20px',
                                      width: '20px'
                                    }}
                                  />
                                  : <Avatar
                                    src='/broken-image.jpg'
                                    style={{
                                      height: '20px',
                                      width: '20px',
                                      marginTop: '-4px'
                                    }}
                                  />
                              }
                              &nbsp;
                            </span> &nbsp;&nbsp;{item.created_by.user_details.first_name}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </List>
                ))
                : ''
            }
            {
              isDelete
                ? <AlertDelete
                  lead={lead} isDelete={isDelete}
                  onClose={onclose}
                  onDelete={onDelete}
                />
                : ''
            }
          </div> */}
          {/* </Tabs> */}
        </Tabs>
        {/* <div style={{ 
                    height: '30px',
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    justifyItems: 'flex-end'
                }}
                >
                    <div className='paginationContainer'>
              <TablePagination
                style={{ display: 'flex', flexDirection: 'row' }}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                component='div'
                labelRowsPerPage='Records Per Page'
                count={value === 0 ? leads.open_lead_count : leads.close_lead_count}
                rowsPerPage={rowsPerPage}
                page={page}
                size='small'
                sx={{
                  '.MuiTablePagination-displayedRows': {
                    display: 'none'
                  },
                  '.MuiTablePagination-actions': {
                    display: 'none'
                  },
                  '.MuiTablePagination-selectLabel': {
                    marginTop: '4px',
                    marginLeft: '-15px'
                  },
                  '.MuiTablePagination-select': {
                    color: 'black',
                    marginRight: '0px',
                    marginLeft: '-12px',
                    marginTop: '-6px'
                  },
                  '.MuiSelect-icon': {
                    color: 'black',
                    marginTop: '-5px'
                  },
                  backgroundColor: 'white',
                  borderRadius: 1,
                  height: '10%',
                  overflow: 'hidden',
                  p: 0,
                  m: 0,
                  width: '39%',
                  pb: 5,
                  color: 'black',
                  mr: 1
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Button
                size='small'
                sx={{
                  backgroundColor: 'white',
                  textTransform: 'lowercase',
                  borderRadius: '7px',
                  mr: 1,
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <ChevronLeftIcon onClick={previous} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353', mr: 1 }} />
                <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', mr: 1 }}>
                  {
                    value === 0
                      ? `${openOffset + 1} to ${leads.open_lead_count > 0 ? valued : 0}`
                      : `${closeOffset + 1} to ${leads.close_lead_count > closeOffset + 10 ? closeOffset + 10 : 0}`
                  }
                </Typography>
                <ChevronRightIcon onClick={next} sx={{ backgroundColor: 'whitesmoke', color: '#1A3353' }} />
              </Button>
              {/* <div>
                <FormControl sx={{ mr: 1, width: 100, color: "#1A3353" }}>
                  <Select
                    className='select'
                    multiple
                    displayEmpty
                    value={personName}
                    style={{
                    height: "32px",
                    color: "#1A3353",
                    fontSize: "13px",
                    backgroundColor: "white",
                    width: "90px",
                    borderRadius: "6px"
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <p>Sort By</p>;
                      }
                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                    </MenuItem>
                    {
                      names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div> 
              <div>
                <Button
                  variant='contained'
                  startIcon={<AddCircleOutlinedIcon style={{ fill: 'white' }} />}
                  onClick={onAddHandle}
                  style={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px', mr: 2, color: 'white' }}
                >
                  Add Lead
                </Button>
              </div>
            </div>
                </div>
                {/* <BsPlus/> */}
        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box
            sx={{ mr: '-253px' }}
          // sx={{ mr:'10px',display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems:'center',color: 'white'}}
          >
            {/* <CustomTablePagination */}
            <TablePagination
              style={{ display: 'flex', flexDirection: 'row' }}
              rowsPerPageOptions={[10, 20, 30, 40, 50]}
              component='div'
              labelRowsPerPage='Records Per Page'
              // count={value === 'Open' ? leads?.open_lead_count : leads?.close_lead_count}
              count={10}
              rowsPerPage={rowsPerPage}
              page={page}
              size='small'
              sx={{
                '.MuiTablePagination-toolbar': {
                  paddingRight: '220px',
                  minHeight: '30px',

                },
                '.MuiTablePagination-displayedRows': {
                  display: 'none'
                },
                '.MuiTablePagination-actions': {
                  display: 'none'
                },
                '.MuiTablePagination-selectLabel': {
                  marginTop: '4px',
                  marginLeft: '-15px',
                  mb: '8px'
                },
                '.MuiTablePagination-select': {
                  color: 'black',
                  marginRight: '0px',
                  marginLeft: '-12px',
                  marginTop: '-3px'
                },
                '.MuiSelect-icon': {
                  color: 'black',
                  marginTop: '-2px'
                },
                backgroundColor: 'white',
                borderRadius: 1,
                height: '10%',
                overflow: 'hidden',
                p: 0,
                m: 0,
                width: '39%',
                pb: 5,
                color: 'black',
                mr: 1
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          <Button
            size='small'
            sx={{
              backgroundColor: 'white',
              textTransform: 'lowercase',
              borderRadius: '7px',
              mr: 1,
              color: 'black',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            <FiChevronLeft
              //  onClick={previous}
              style={{ backgroundColor: 'whitesmoke', color: '#1A3353', marginRight: 1 }} />
            <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', mr: 1 }}>
              1 to 0
              {/* {
                    value === 0
                      ? `${openOffset + 1} to ${leads.open_lead_count > 0 ? valued : 0}`
                      : `${closeOffset + 1} to ${leads.close_lead_count > closeOffset + 10 ? closeOffset + 10 : 0}`
                  } */}
            </Typography>
            <FiChevronRight
              //  onClick={next}
              style={{ backgroundColor: 'whitesmoke', color: '#1A3353' }} />
          </Button>
          <Button
            variant='contained'
            startIcon={<FiPlus color='#1976d2' style={{ width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '10px', marginTop: '-1px' }} />}
            onClick={onAddHandle}
            sx={{ textTransform: 'capitalize', fontWeight: 'bold', height: '30px', color: 'white', mr: '-13px' }}
          >
            Add Lead
          </Button>
        </Stack>

      </CustomToolbar>
      {value === 'Open' ?
        <Box sx={{ p: '10px', mt: '5px' }}>
          {
            // leads.open && leads.open
            //   ? stableSort(leads.open && leads.open, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
            stableSort(openLeads, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
              <Box key={index}>
                <Box sx={{ p: '10px' }}>
                  <Box sx={{
                    borderRadius: '5px',
                    border: '1px solid lightgray',
                    bgcolor: 'white',
                    p: '5px',
                    minHeight: '70px'
                  }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: '10px' }}>
                      <div style={{ color: '#1A3353', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }} onClick={() => selectLeadList(item?.id)}>
                        {item?.title}
                      </div>
                      <div onClick={() => deleteLead(item?.id)}>
                        <FaTrashAlt style={{ cursor: 'pointer', color: 'gray' }} />
                      </div>
                    </Stack>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', p: '0px 10px 0px 10px' }}>
                      <div style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        <div style={{ color: 'gray', fontSize: '16px', textTransform: 'capitalize' }}>
                          {item?.country || ''} - source <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.source || '--'}</span> - status <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.status || '--'}</span>
                        </div>
                        <Box sx={{
                          ml: 1
                          //  flexWrap: 'wrap', width: '50%' 
                        }}>
                          {
                            item.tags.map((tagData: any, index: any) => (
                              // tag.slice(0, 3).map((tagData: any, index: any) => (
                              <Label tags={tagData} key={index} />
                            ))
                          }{item.tags.length > 4 ? <Link sx={{ ml: 1 }}>+{item.tags.length - 4}</Link> : ''}
                        </Box>
                        <Box sx={{ ml: 1 }}>
                          <div style={{ display: 'flex' }}>
                            <AvatarGroup
                              // total={2}
                              max={3}
                            >
                              {/* <Tooltip title={con.user.username}> */}
                              {/* {tag.map((tagData: any, index: any) => ( */}
                              {item?.team && item?.team?.map((team: any, index: any) => (
                                <Avatar
                                  alt={team}
                                  src={team}
                                >
                                  {team}
                                </Avatar>
                              ))}
                              {/* </Tooltip> */}
                              {/* )} */}
                            </AvatarGroup>
                          </div>

                        </Box>
                        {/* {
                          item.assigned_to.map((assignItem: any, index: any) => (
                            assignItem.user_details.profile_pic
                              ? <Avatar alt='Remy Sharp'
                                src={assignItem.user_details.profile_pic}
                              />
                              : <Avatar alt='Remy Sharp'
                                size='small'
                              // sx={{ backgroundColor: 'deepOrange', color: 'white', textTransform: 'capitalize', mt: '-20px', ml: '10px' }}
                              >
                                {assignItem.user_details.first_name.charAt(0)}
                              </Avatar>
                          ))
                        } */}
                      </div>
                      <div style={{ color: 'gray', fontSize: '16px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {/* created on {formatDate(item.created_on)} by   &nbsp;<span> */}
                        created&nbsp; {FormateTime(item?.created_at)}&nbsp; by
                        <Avatar
                          alt={item?.first_name}
                          src={item?.created_by?.profile_pic}
                          sx={{ ml: 1 }}
                        // style={{
                        //   height: '20px',
                        //   width: '20px'
                        // }}
                        /> &nbsp;&nbsp;{item?.first_name}&nbsp;{item?.last_name}
                      </div>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </Box>
        : <Box sx={{ p: '10px', mt: '5px' }}>
          {
            stableSort(closedLeads?.length || [], getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
              <Box
                key={index}
              >
                <Box sx={{ p: '10px' }}>
                  <Box sx={{
                    borderRadius: '5px',
                    border: '1px solid lightgray',
                    bgcolor: 'white',
                    p: '5px',
                    minHeight: '70px'
                  }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: '10px' }}>
                      <div style={{ color: '#1A3353', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }} onClick={() => selectLeadList(item?.id)}>
                        {item?.title}
                      </div>
                      <div onClick={() => deleteLead(item)}>
                        <FaTrashAlt style={{ cursor: 'pointer', color: 'gray' }} />
                      </div>
                    </Stack>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', p: '0px 10px 0px 10px' }}>
                      <div style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        <div style={{ color: 'gray', fontSize: '16px', textTransform: 'capitalize' }}>
                          {item?.country || ''} - source <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.source || '--'}</span> - status <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.status || '--'}</span>
                        </div>
                        <Box sx={{ ml: 1 }}>
                          {
                            item.tags.map((tagData: any, index: any) => (
                              // tag.slice(0, 3).map((tagData: any, index: any) => (
                              <Label tags={tagData} key={index} />
                            ))
                          }{item.tags.length > 4 ? <Link sx={{ ml: 1 }}>+{item.tags.length - 4}</Link> : ''}
                        </Box>
                        <Box sx={{ ml: 1 }}>
                          <div style={{ display: 'flex' }}>
                            <AvatarGroup
                              // total={2}
                              max={3}
                            >
                              {/* {con.map((con) => */}
                              {/* <Tooltip title={con.user.username}> */}
                              {item?.team && item?.team?.map((team: any, index: any) => (
                                <Avatar
                                  alt={team}
                                  src={team}
                                >
                                  {team}
                                </Avatar>
                              ))}
                              {/* </Tooltip> */}
                              {/* )} */}
                            </AvatarGroup>
                          </div>

                        </Box>

                      </div>
                      <div style={{ color: 'gray', fontSize: '16px', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        created&nbsp; {FormateTime(item?.created_at)}&nbsp; by
                        <Avatar
                          alt={item?.first_name}
                          src={item?.created_by?.profile_pic}
                          sx={{ ml: 1 }}
                        /> &nbsp;&nbsp;{item?.first_name}&nbsp;{item?.last_name}
                      </div>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </Box>}
      {/* {loading &&
        <Spinner />} */}
      {/* <DeleteModal
        onClose={deleteLeadModalClose}
        open={deleteLeadModal}
        id={selectedId}
        modalDialog={modalDialog}
        modalTitle={modalTitle}
      /> */}
      <DeleteModal
        onClose={deleteLeadModalClose}
        open={deleteLeadModal}
        id={selectedId}
        modalDialog={modalDialog}
        modalTitle={modalTitle}
        DeleteItem={deleteItem}
      />
    </Box>
  )
}
