"use client"
import { useTestContext } from '@/context/TestContext';
import { AptiResultTypes, OaResultTypes } from '@/interface/testResultTypes';
import { axiosInst } from '@/utils/axios';
import { Button, Table, Pagination, TableHeader, TableColumn, TableBody, TableCell, TableRow, Tabs, Tab } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TestRecord = () => {
    const router = useRouter();
    const [selected, setSelected] = useState<any>("apti");
    const [aptiData ,setAptiData] = useState<AptiResultTypes[] >([]);
    const [oaData, setOadata] = useState<OaResultTypes[]>([]);
    const { setAptiTestData, setOATestData } = useTestContext();
    useEffect(()=>{
        const fetchAptidata = async()=>{
            const res = await axiosInst.get(`ai/aptiresult?query=Aptitude&limit=10`)
            console.log(res.data);
            setAptiData(res.data)
        }

        const fetchOadata = async()=>{
            const res = await axiosInst.get(`ai/oaresult?query=mcq&limit=10`)
            console.log(res.data);
            setOadata(res.data)
        }
        fetchAptidata();
        fetchOadata();
    },[])

    const Details = (test: AptiResultTypes | OaResultTypes) => {
        if(test.testType === "Aptitude Test" )
            {
            setAptiTestData(test);
            router.push(`/profile/testrec/${test._id}`)
        }
        else{
            setOATestData(test);
            router.push(`/profile/testrec/${test._id}`)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-purple-500 mb-6">
                    Your all test record
                </h1>
                <div className="overflow-x-auto">
                    <Tabs
                        fullWidth
                        size="md"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="apti" title="Aptitude">
                            <Table aria-label="Test Records" style={{ minWidth: '100%', background: '#1A1A1A' }}>
                                <TableHeader>
                                    <TableColumn>Date</TableColumn>
                                    <TableColumn>Test type</TableColumn>
                                    <TableColumn>Test Difficulty</TableColumn>
                                    <TableColumn>Score</TableColumn>
                                    <TableColumn>AI Powered Statistics</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {aptiData.map((item: AptiResultTypes, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item?.testDate}</TableCell>
                                            <TableCell>{item?.testType}</TableCell>
                                            <TableCell>{item?.difficulty}</TableCell>
                                            <TableCell>{item?.score}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { Details(item) }} variant='ghost' color="secondary">
                                                    View now ✨
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Tab>
                        <Tab key={"Oa"} title="OA Test">
                            <Table aria-label="Test Records" style={{ minWidth: '100%', background: '#1A1A1A' }}>
                                <TableHeader>
                                    <TableColumn>Date</TableColumn>
                                    <TableColumn>Test type</TableColumn>
                                    <TableColumn>Test Difficulty</TableColumn>
                                    <TableColumn>AI Powered Statistics</TableColumn>
                                </TableHeader>
                                <TableBody>
                                {oaData.map((item: AptiResultTypes, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item?.testDate}</TableCell>
                                            <TableCell>{item?.testType}</TableCell>
                                            <TableCell>{item?.difficulty}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { Details(item) }} variant='ghost' color="secondary">
                                                    View now ✨
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Tab>
                    </Tabs>
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
