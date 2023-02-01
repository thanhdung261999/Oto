import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { getDetailsCar } from '../../services/ApiServices';
import Quotation from '../Cardforsale/Quotation';
import { AiOutlineEye, AiFillCar, AiOutlineCalendar } from 'react-icons/ai';
import { BsFillBugFill, BsFlag } from 'react-icons/bs';
import { GiGearStick, GiPathDistance } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive';
import ImageViewer from 'react-simple-image-viewer';
import './DetailsCar.scss';
import { FaReact } from 'react-icons/fa';
const DetailsCar = (props) => {
  const [data, setData] = useState({});
  const [indexActive, setIndexActive] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const params = useParams();
  const idCar = params.id.substring(1);
  const images = data && data.imageFiles;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const isTabletAndMobile = useMediaQuery({
    query: '(max-width : 1023px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width : 1023px)',
  });

  useEffect(() => {
    fetCar();
  }, [idCar]);
  const fetCar = async () => {
    const res = await getDetailsCar(idCar);
    if (res && res.status === 200) {
      if (!_.isEmpty(res.data)) {
        setData(res.data);
      }
    }
  };
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  return (
    <>
      {isLoading && (
        <div className="loading-wrapper">
          <span>
            <FaReact className="icon-react" />
          </span>
        </div>
      )}
      {isLoading === false && (
        <div className="details-car-container">
          <div className={isTabletAndMobile ? '' : 'container'}>
            <div className="details-content">
              <div className={`datails-des ${isTabletAndMobile ? 'col-12 pd-mb-tl' : 'col-8'}`}>
                <div className="content-main">
                  <div className="title">
                    <div className="title-car">
                      <AiFillCar className="icon-car" />
                      <span>{data && data?.title}</span>
                    </div>
                    <div className="time-view">
                      <div className="time">
                        <span>{data && data.timePost}</span>
                      </div>
                      <div className="view">
                        <AiOutlineEye className="icon-eye" />
                        <span>{data && data.view} view</span>
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price:</span>
                    <span>{data && data.price && new Intl.NumberFormat().format(data.price) + ' $'}</span>
                  </div>
                  <div className="image">
                    <div className="list-car-details">
                      <Carousel
                        className="carousel"
                        interval={7000}
                        autoPlay
                        autoFocus={true}
                        transitionTime={800}
                        infiniteLoop={true}
                        emulateTouch={true}
                        showThumbs={true}
                        showArrows={true}
                      >
                        {data &&
                          data.imageFiles &&
                          data.imageFiles.length > 0 &&
                          data.imageFiles.map((item, index) => {
                            return (
                              <div
                                key={`img-details-${index}`}
                                className="list-car-details-item"
                                onClick={() => {
                                  openImageViewer(index);
                                }}
                              >
                                <img
                                  src={item}
                                  alt={`details-${index}`}
                                  onClick={() => {
                                    setIndexActive(index);
                                  }}
                                />
                              </div>
                            );
                          })}
                      </Carousel>
                    </div>
                  </div>
                  <div className="car-details">
                    <div className="car_details-content">
                      <div className="car_details-content-list">
                        <div className="car_details-content-item col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <AiOutlineCalendar className="icon" />
                            <span>Production year</span>
                          </div>
                          <span className="col-lg-5">{data && data.publishing_year}</span>
                        </div>
                        <div className="car_details-content-item col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <AiFillCar className="icon" />
                            <span>Designs</span>
                          </div>
                          <span className="col-lg-5">{data && data.car_model}</span>
                        </div>
                        <div className="car_details-content-item col-lg-4  col-sm-12 col-md-6 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <BsFillBugFill className="icon" />
                            <span>Status</span>
                          </div>
                          <span className="col-lg-5">{data && data.status}</span>
                        </div>
                        <div className="car_details-content-item col-lg-4  col-sm-12 col-md-6 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <GiPathDistance className="icon" />
                            <span>Km traveled</span>
                          </div>
                          <span className="col-lg-5">
                            {data && data.km_traveled && new Intl.NumberFormat().format(data.km_traveled) + ' km'}
                          </span>
                        </div>
                        <div className="car_details-content-item col-lg-4  col-sm-12 col-md-6 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <GiGearStick className="icon" />
                            <span>Gear</span>
                          </div>
                          <span className="col-lg-5">{data && data.gear}</span>
                        </div>
                        <div className="car_details-content-item col-lg-4  col-sm-12 col-md-6 col-12">
                          <div className="col-lg-7 col-7 col-sm-6 col-md-6">
                            <BsFlag className="icon" />
                            <span>Origin</span>
                          </div>
                          <span className="col-lg-5">{data && data.national}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="description">Description</div>
                  <hr />
                  <div className="content-description">
                    <div className="mb-3">{data && data.description}</div>
                    <div>Commitment to customers in writing when buying a car at Bussan:</div>
                    <div>- Commitment to the original car does not crash, flooded.</div>
                    <div>- Many warranty and after-sales modes.</div>
                    <div>- Support all procedures for loans, transfer of names, preferential interest rates.</div>
                    <div>Prestige is our survival!</div>
                    <div>Contact: 0999.999.999</div>
                  </div>
                </div>
              </div>
              {isPc ? (
                <div className="details-intro col-4">
                  <Quotation className="quotation" />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
      )}
    </>
  );
};
export default DetailsCar;
