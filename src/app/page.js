"use client"

import { APIProvider, Map, Pin, AdvancedMarker, useMap  } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchDumpSites } from '@/hooks/use-get-sites';
import { Circle } from '@/components/Circle';
import { Popup } from '@/components/Popup';
import { useFetchMills } from '@/hooks/use-mills';
import AddNewPKS from '@/components/AddNewPKS';

export const everyMinute = 60 * 1000;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data, isFetching } = useFetchDumpSites({}, {refetchInterval: everyMinute})
  const { data: millData, isFetching: isPending } = useFetchMills({}, {refetchInterval: everyMinute})

  return (
    <div className="w-full h-screen items-center justify-items-center min-h-screen gap-16">
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}>
        <Map
          defaultZoom={13}
          mapId='DEMO_MAP_ID'
          defaultCenter={ { lat: 5.610867, lng: 8.171645 } }
          onCameraChanged={ (ev) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        >
          {(!isFetching || isPending) && <PoiMarkers mills={millData} pks={data}/>}
        </Map>
      </APIProvider>
      <AddNewPKS menuOpen={menuOpen} toggle={() => setMenuOpen(false)}/>
    </div>
  );
}

export const PoiMarkers = ({ mills, pks }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const [circleCenter, setCircleCenter] = useState(null)
  const [selectedMill, setSelectedMill] = useState(null);
  const [selectedPks, setSelectedPks] = useState(null);

  const handleMarkerClick = (mill) => {
    setSelectedMill(mill);
  };
  const handlePKSClick = (mill) => {
    setSelectedPks(mill);
  };

  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({map});
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = useCallback((ev) => {
    if(!map) return;
    if(!ev.latLng) return;
    map.panTo(ev.latLng);
    setCircleCenter(ev.latLng);
  }, []);

  return (
    <>
      <Circle
        radius={800}
        center={circleCenter}
        strokeColor={'#0c4cb3'}
        strokeOpacity={1}
        strokeWeight={3}
        fillColor={'#3b82f6'}
        fillOpacity={0.3}
      />
      {mills && mills.map((mill) => (
        <AdvancedMarker
          map={map.map}
          clickable={true}
          onClick={(e) => {
            handleClick(e);
            handleMarkerClick(mill)
          }}
          key={mill.millName}
          ref={marker => setMarkerRef(marker, mill.millName)}
          position={{ lat: mill.latitude, lng: mill.longitude }}
        >
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
      {pks && pks.map((mill) => (
        <AdvancedMarker
          map={map.map}
          clickable={true}
          onClick={(e) => {
            handleClick(e);
            handlePKSClick(mill)
          }}
          key={mill.latitude}
          ref={marker => setMarkerRef(marker, mill.latitude)}
          position={{ lat: mill.latitude, lng: mill.longitude }}
        >
          <Pin background={'#FF0000'} glyphColor={'#FFF'} borderColor={'#FFF'} />
        </AdvancedMarker>
      ))}
      {selectedMill && (
        <Popup
          mill={selectedMill}
          onClose={() => setSelectedMill(null)}
          title={'Mill Details'}
        />
      )}
      {selectedPks && (
        <Popup
          mill={selectedPks}
          onClose={() => setSelectedPks(null)}
          title={'Palm Kernel Shell Details'}
        />
      )}
    </>
  );
};
