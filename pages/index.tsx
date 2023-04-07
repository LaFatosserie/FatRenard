import type { NextPage } from 'next'
import Layout from '../components/Layout/Layout'
import {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "redux/hook"
import SplashScreen from "components/app/SplashScreen"
import {appReady, me, selectUserId, selectUserLoggedIn} from "redux/slices/App"
import { Wrapper } from '@googlemaps/react-wrapper'
import { Map } from 'components/map'
import Circle from 'components/map/Circle'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const ready = useAppSelector(state => state.app.ready)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    const loggedIn = useAppSelector(selectUserLoggedIn)
    const userId = useAppSelector(selectUserId)

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
      lat: 45.7555016,
      lng: 4.8296179,
    })
    const [myPos, setMyPos] = useState<google.maps.LatLngLiteral>({
      lat: 45.7555016,
      lng: 4.8296179
    })
    const [zoom, setZoom] = useState(15)
    
    const onIdle = (map: google.maps.Map) => {
        if (!map) return;
        setZoom(map.getZoom()!);
        setCenter(map.getCenter()!.toJSON());
    };

    useEffect(() => {
      const token = localStorage.getItem('__fat_token__')
      if (token && !userId) {
        dispatch(me())
      } else  if (!loggedIn && token) {
        router.push('auth/signin')
      }
      setTimeout(() => dispatch(appReady()), 3000)
    }, [loggedIn])

    if (!ready) return <SplashScreen />

    return (
        <Layout title="Fat Renard">
            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                {/* {zone && ( */}
              <Map
                center={center}
                zoom={zoom}
                style={{ width: "100%", height: "100%" }}
                onIdle={onIdle}
              >
                {/* {zone.paths && (
                  <Polygon
                    strokeColor="#ff0000"
                    strokeOpacity={1}
                    strokeWeight={3}
                    fillColor="#a30000"
                    fillOpacity={0.4}
                    paths={zone.paths}
                  />
                )} */}
                {myPos && (
                  <Circle
                    center={{ lat: myPos.lat, lng: myPos.lng }}
                    strokeColor="#0000ff"
                    strokeOpacity={0.8}
                    strokeWeight={zoom > 7 ? 4 : 2}
                    fillColor="#0000ff"
                    fillOpacity={0.2}
                    radius={1.2}
                  />
                )}
                {/* {chased && (
                  <Circle
                    center={{ lat: chased.latitude, lng: chased.longitude }}
                    strokeColor="#C04A18"
                    strokeOpacity={0.8}
                    strokeWeight={zoom > 7 ? 4 : 2}
                    fillColor="#C04A18"
                    fillOpacity={0.5}
                    radius={chased.accuracy}
                  />
                )} */}
              </Map>
            </Wrapper>
        </Layout>
    )
}

export default Home
