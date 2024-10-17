import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    CircularProgress,
    Modal,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to handle opening the modal and setting the selected user
    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-center text-[#39FF14] mb-8">Admin Dashboard</h1>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userStatistics.map(({ user, goals, workouts }) => (
                        <div
                            key={user._id}
                            className="bg-[#1E1E1E] border-2 border-[#39FF14] text-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-neon"
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-[#39FF14] text-black rounded-full p-3">
                                    <AccountCircleIcon fontSize="large" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleViewDetails({ user, goals, workouts })}
                                className="w-full bg-[#39FF14] text-black py-2 rounded hover:bg-[#4aff22] transition-transform"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for showing user details */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: '#1c1c1c',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 10,
                    }}
                >
                    {selectedUser && (
                        <>
                            <h2 className="text-xl font-bold text-[#39FF14] mb-4">{selectedUser.user.name}'s Details</h2>
                            <div className="space-y-8">
                                {/* Goals Section */}
                                <div>
                                    <h3 className="text-lg text-[#39FF14] font-semibold mb-2"><EmojiEventsIcon /> Goals</h3>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="Goals table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="text-[#39FF14]">Goal Type</TableCell>
                                                    <TableCell className="text-[#39FF14]">Progress</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedUser.goals.length > 0 ? (
                                                    selectedUser.goals.map((goal) => (
                                                        <TableRow key={goal._id}>
                                                            <TableCell>{goal.goalType}</TableCell>
                                                            <TableCell>{goal.progress}/{goal.targetValue}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2}>No goals available</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                                {/* Habbits Section */}
                                <div>
                                    <h3 className="text-lg text-[#39FF14] font-semibold mb-2"><FitnessCenterIcon /> Habbits</h3>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="Habbits table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="text-[#39FF14]">Activity</TableCell>
                                                    <TableCell className="text-[#39FF14]">Duration (min)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedUser.workouts.length > 0 ? (
                                                    selectedUser.workouts.map((workout) => (
                                                        <TableRow key={workout._id}>
                                                            <TableCell>{workout.activity}</TableCell>
                                                            <TableCell>{workout.duration} min</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2}>No habbits available</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>

                            <button
                                onClick={handleCloseModal}
                                className="w-full bg-[#39FF14] text-black py-2 mt-4 rounded hover:bg-[#4aff22] transition-transform"
                            >
                                Close
                            </button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
