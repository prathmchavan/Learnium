"use client"
import { Button, Table, Pagination, TableHeader, TableColumn, TableBody, TableCell, TableRow } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const TestRecord = () => {
    const router = useRouter();
    const data = [
        {_id:'1', date: '1/11/2050', type: 'Aptitude Test', difficulty: 'Basic', score: '100%' },
        {_id:'2', date: '1/11/2050', type: 'OA Test', difficulty: 'Medium', score: '100%' },
        {_id:'3', date: '1/11/2050', type: 'Aptitude Test', difficulty: 'Hard', score: '100%' },
        {_id:'4',date: '1/11/2050', type: 'OA Test', difficulty: 'Basic', score: '100%' },
        {_id:'5',date: '1/11/2050', type: 'Aptitude Test', difficulty: 'Medium', score: '100%' },
        {_id:'6',date: '1/11/2050', type: 'OA Test', difficulty: 'Basic', score: '100%' },
    ];

    const Details =(id:any)=>{
        router.push(`/profile/testrec/${id}`)
    }

    return (
        <div className="min-h-screen bg-black text-white ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-purple-500 mb-6">
                    Your all test record
                </h1>
                <div className="overflow-x-auto">
                    <Table aria-label="Test Records" style={{ minWidth: '100%', background: '#1A1A1A' }}>
                        <TableHeader>
                            <TableColumn>Date</TableColumn>
                            <TableColumn>Test type</TableColumn>
                            <TableColumn>Test Difficulty</TableColumn>
                            <TableColumn>Score</TableColumn>
                            <TableColumn>AI Powered Statistics</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.difficulty}</TableCell>
                                    <TableCell>{item.score}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{Details(item._id)}} variant='ghost' color="secondary">
                                            View now ✨
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Button variant='flat' color="secondary">
                        Prev
                    </Button>
                    <Pagination total={4} initialPage={1} />
                    <Button variant='flat' color="secondary">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TestRecord;
