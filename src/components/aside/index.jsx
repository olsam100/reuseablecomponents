import React from 'react'
import { useAppContext } from 'context'

const a = (
  <svg aria-label='Prodigy' viewBox='0 0 540 158' width='100' height='29'>
    <path d='M70.6 48.6c7 7.3 10.5 17 10.5 29.2s-3.3 22-10.4 29.2c-7 7.3-16 11-27 11-9.4 0-16.8-2.6-21.7-8v44.7H0V39h20.7v8c4.8-6.3 12.4-9.5 23-9.5 11 0 20 3.7 27 11zM22 76v3.6c0 12 7.2 19.8 18.2 19.8 11.2 0 18.7-8 18.7-21.6S51.3 56.2 40 56.2C29.2 56.2 22 64 22 76zM133.8 59.4c-12.6 0-20.5 7-20.5 17.8v39.3h-22V39h21v8.8c4-6.4 11.3-9.6 21.4-9.6v21.2zM209.5 107c-7.6 7.4-17.5 11.2-29.5 11.2s-22-3.8-29.7-11c-7.6-7.6-11.5-17.3-11.5-29.3 0-12.2 4-22 11.5-29.3 7.8-7.3 17.7-11 29.7-11s22 3.7 29.5 11c7.8 7.3 11.7 17 11.7 29.2 0 11.8-4 21.6-11.7 29zM180 56.3c-5.7 0-10.3 2-13.8 5.8s-5.2 9-5.2 15.7c0 6.7 1.8 12 5.2 15.7 3.4 3.8 8 5.7 13.8 5.7s10.3-1.8 13.8-5.6 5.2-9 5.2-15.7c0-6.8-1.8-12-5.2-15.7-3.5-3.8-8-5.8-13.8-5.8zM313 116.5h-20.5v-8c-4.4 5.6-12.7 9.7-23 9.7-11 0-20-3.8-27-11-7-7.5-10.5-17.2-10.5-29.4s3.5-22 10.3-29.2c7-7.3 16-11 27-11 9.7 0 17 2.6 22 8V0H313v116.5zm-58.8-38.7c0 13.6 7.5 21.4 18.7 21.4 10.8 0 18.2-7.3 18.2-19.8V76c0-12.2-7.3-19.8-18.3-19.8-11.3 0-18.8 8-18.8 21.6zM354 13.6c0 3.6-1.2 6.8-3.8 9.3-5 4.8-13.6 4.8-18.6 0C323.2 15.3 330-.3 341 .3c7.3 0 13 6 13 13.2zm-2 103h-22V39h22v77.5zM425 47v-8h20.6v80.4c0 11.2-3.6 20-10.6 26.8-7 6.7-16.6 10-28.5 10-23.4 0-37-11.4-40-29.8l21.8-.8c1 7.6 7.6 12 17.4 12 11.2 0 18-5.8 18-16.6v-11c-5 5.4-12.4 8-21.8 8-11 0-20-3.7-27-11s-10.4-17-10.4-29.2 3.5-22 10.3-29.2c7-7.3 16-11 27-11 10.6 0 18.3 3 23 9.5zM387 78c0 13.6 7.5 21.6 18.7 21.6 11 0 18.3-7.6 18.3-19.8V76c0-12.2-7.3-19.8-18.3-19.8-11.2 0-18.7 8-18.7 21.6zM488.8 154.8H465l19.8-45L454.5 39h24l18 46.2L514 39h24.3l-49.7 115.8z'></path>
  </svg>
)

const Aside = () => {
  const { progressInfo, projectInfo } = useAppContext()
  const thisSession = progressInfo.acceptCount + progressInfo.rejectCount
  const progressValue = Math.round(thisSession / 2)

  return (
    <aside>
      <div className='sidebar'>
        <header className='header'>{a}</header>
        <section className='section'>
          <div className='firstsection'>
            <div>Example</div>
            <select name='' id=''></select>
          </div>
          <div className='firstsection'>
            <div>Theme</div>
            <select name='' id=''></select>
          </div>
        </section>
        <section className='section'>
          <h3>Project Info</h3>
          <div className='secondsection'>
            <div>Dataset</div>
            <p>{projectInfo.dataset}</p>
          </div>
          <div className='secondsection'>
            <div>View ID</div>
            <p>{projectInfo.viewId}</p>
          </div>
        </section>
        <section className='section'>
          <h3>Progress</h3>
          <div className='thirdsection'>
            <div>this session</div>
            <p>{thisSession}</p>
          </div>
          <div className='thirdsection'>
            <div>total</div>
            <p>{thisSession}</p>
          </div>
          <div className='thirdsection'>
            <progress
              className='progress'
              value={progressValue}
              progressvalue={progressValue}
              style={{ '--progress-value': `${progressValue}%` }}
              max='100%'
            >
              {progressValue}
            </progress>
            <div className='progress-percentage'>{`${progressValue}%`}</div>
          </div>
          <div className='thirdsection'>
            <div>
              {<svg viewBox='0 0 225 10' width='225' height='10'></svg>}
            </div>
            <div>
              <div>accept</div>
              <p>{progressInfo.acceptCount}</p>
            </div>
            <div>
              <div>reject</div>
              <p>{progressInfo.rejectCount}</p>
            </div>
            <div>
              <div>ignore</div>
              <p>{progressInfo.ignoreCount}</p>
            </div>
          </div>
        </section>
        <section className='section'>
          <h3>history</h3>
          <span></span>
        </section>
        <footer></footer>
      </div>
    </aside>
  )
}

export default Aside
