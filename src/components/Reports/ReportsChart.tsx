import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AuthAxios } from "../../services/api";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Vacations Subscribers Count",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const fakedata = {
  labels,
  datasets: [
    {
      label: "Subscribers",
      data: [120, 100, 20, 30, 40, 50, 60],
      backgroundColor: "rgba(255, 99, 132, 0.7)",
    },
  ],
};

export default function ReportsChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(fakedata);

  useEffect(() => {
    setIsLoading(true)
    AuthAxios.get('/admin/vacations/count')
    .then((res) => {
      const vacations = res.data.result
      const subCount = vacations.map((v: any) => v.subscribersCount)
      const newLabels = vacations.map((v: any) => `${v.destination} (id: ${v.id})`)
      const newData = {
        labels: newLabels,
        datasets: [
          {
            label: "Subscribers",
            data: subCount,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
          },
        ],
      };
      
      setData(newData)
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <Box sx={{
      display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',

    }}>
      {isLoading ? (<CircularProgress color="success"/>) : (<Bar options={options} data={data} />)}
    </Box>
  )
}
