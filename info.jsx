import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function infoBox({data}){
const imgUrl = "https://th.bing.com/th/id/OIP.DQICDR6cT6uLkUM7vOSy6gHaEP?rs=1&pid=ImgDetMain"

    


    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imgUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {data.open}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          Open Price = {data.open} <br />
          high Price = {data.high} <br />
          low Price = {data.low} <br />
          close Price = {data.close} <br />
            
            
            

          </Typography>
        </CardContent>
       
      </Card>

    )
}