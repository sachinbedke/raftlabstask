import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Task } from '../types/types';
import { Table, Button, Tag, Input, Select, Space } from 'antd';
import { useAppDispatch } from '../store/store';
import { deleteTask, filterTasks } from '../slices/tasksSlice';
import moment from 'moment';

interface TaskListProps {
    onSelectTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onSelectTask }) => {
    const tasks = useSelector((state: RootState) => state.tasks.filteredTasks);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<Partial<Task>>({});

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
    };

    const handleFilterChange = (value: any, key: keyof Task) => {
        const newFilter = { ...filter, [key]: value };
        setFilter(newFilter);
        dispatch(filterTasks(newFilter));
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a: Task, b: Task) => a.title.localeCompare(b.title) },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', sorter: (a: Task, b: Task) => moment(a.dueDate).unix() - moment(b.dueDate).unix() },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: string) => {
                let color = priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green';
                return <Tag color={color}>{priority.toUpperCase()}</Tag>;
            },
            sorter: (a: Task, b: Task) => a.priority.localeCompare(b.priority),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = status === 'completed' ? 'blue' : 'gray';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Task) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onSelectTask(record)}>Edit</Button>
                    <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <div className="mb-4">
                <Space size="middle">
                    <Input placeholder="Search by title" onChange={e => handleFilterChange(e.target.value, 'title')} className="border border-gray-300 rounded-lg shadow-sm" />
                    <Select placeholder="Filter by priority" onChange={value => handleFilterChange(value, 'priority')} className="border border-gray-300 rounded-lg shadow-sm">
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                    </Select>
                    <Select placeholder="Filter by status" onChange={value => handleFilterChange(value, 'status')} className="border border-gray-300 rounded-lg shadow-sm">
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="in-progress">In Progress</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                </Space>
            </div>
            <Table columns={columns} dataSource={tasks} rowKey="id" />
        </div>
    );
};

export default TaskList;
