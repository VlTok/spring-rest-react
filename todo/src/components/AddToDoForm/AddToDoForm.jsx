import React from 'react';

import {Form, Row, Col, Button, Input, Popconfirm} from 'antd';

import classNames from 'classnames'

const AddToDoForm = ({onFormSubmit, theme}) => {

    const [form] = Form.useForm();

    const onFinish = () =>{
        onFormSubmit({
            text: form.getFieldValue('text')
        });

        form.resetFields();
    }

    return(
        <Form 
            form = {form}
            onFinish = {onFinish}
            layout = "horizontal"            
        >
            <Row gutter = {20}>
                <Col xs={20}>
                    <Form.Item name={"text"}>
                        <Input placeholder = "we need to be done?" className = {
                            classNames('inputTask',`${theme === 'light' ? '':'formInputDark'}`)}/>
                    </Form.Item>
                </Col>
                <Col xs={4}>
                    <Button className = {classNames('buttonSub',`${theme === 'light' ? '':'subButtonDark'}`)} htmlType = "submit" block>
                        Add Todo
                    </Button>
                </Col>
            </Row>                
        </Form>

    );
}

export default AddToDoForm;