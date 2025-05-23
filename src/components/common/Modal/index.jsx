import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './index.scss';

const ModalComponent = ({ modalOpen, setModalOpen, setStatus, status, sendStatus, isEdit, updateStatus,   }) => {

    return ( 
        <>
            <Modal title="Create a Post" centered open={modalOpen} onOk={() => { setStatus(""); setModalOpen(false) }}
                onCancel={() => { setStatus(""); setModalOpen(false)}}
                footer={[

                    <Button key="submit" type="primary" disabled={status.length > 0 ? false : true} onClick={isEdit ? updateStatus : sendStatus}>
                         {isEdit ? "Update" : "Post"}
                    </Button>
                ]}>

                <input className='modal-input' placeholder='What do you want to share with others' onChange={(event) => setStatus(event.target.value)} value={status} />

            </Modal>
        </>
    );
};

export default ModalComponent;