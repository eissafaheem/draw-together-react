import React from 'react'
import UserDetailsModalStyles from './UserDetailsModal.module.css'
import Input from '../input/Input'
import Button from '../button/Button'
import useUserDetailsModalHook from './UserDetailsModal.hook'

export type UserDetailsModalProps = {
    setUserDetails: React.Dispatch<React.SetStateAction<string>>,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function UserDetailsModal(props: UserDetailsModalProps) {

    const {
        onInputChange,
        onSubmit
    } = useUserDetailsModalHook(props);

    return (
        <div className={UserDetailsModalStyles['modal-container']}>
            <form className={UserDetailsModalStyles["modal"]}>
                <label >Please enter your name for others to identify you :&#41;</label>
                <Input onChange={(event: any)=>{onInputChange(event)}} placeholder='Your name here' />
                <Button onClick={(event:any)=>onSubmit(event)} text='Enter' type='primary' />
            </form>
        </div>
    )
}

export default UserDetailsModal
