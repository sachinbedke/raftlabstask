import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Task } from '../types/types';
import { useAppDispatch } from '../store/store';
import { addTask, editTask } from '../slices/tasksSlice';
import moment from 'moment';

interface TaskFormProps {
    selectedTask: Task | null;
    onClearSelection: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ selectedTask, onClearSelection }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedTask) {
            form.setFieldsValue({
                ...selectedTask,
                dueDate: moment(selectedTask.dueDate),
            });
        } else {
            form.resetFields();
        }
    }, [selectedTask, form]);

    const handleSubmit = (values: any) => {
        const taskData: Task = {
            id: selectedTask ? selectedTask.id : Date.now().toString(),
            title: values.title,
            description: values.description,
            dueDate: values.dueDate.format('YYYY-MM-DD'),
            priority: values.priority,
            status: values.status,
        };

        if (selectedTask) {
            dispatch(editTask(taskData));
        } else {
            dispatch(addTask(taskData));
        }

        form.resetFields();
        onClearSelection();
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">{selectedTask ? 'Edit Task' : 'Add New Task'}</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                    <Input placeholder="Task Title" className="border border-gray-300 rounded-lg shadow-sm" />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
                    <Input.TextArea placeholder="Task Description" rows={4} className="border border-gray-300 rounded-lg shadow-sm" />
                </Form.Item>
                <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select a due date' }]}>
                    <DatePicker className="border border-gray-300 rounded-lg shadow-sm" />
                </Form.Item>
                <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select a priority' }]}>
                    <Select className="border border-gray-300 rounded-lg shadow-sm">
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Select className="border border-gray-300 rounded-lg shadow-sm">
                        <Select.Option value="in-progress">In Progress</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" className="mr-2">
                    {selectedTask ? 'Update Task' : 'Add Task'}
                </Button>
                {selectedTask && <Button onClick={onClearSelection} type="default">Cancel Edit</Button>}
            </Form>
        </div>
    );
};

export default TaskForm;
