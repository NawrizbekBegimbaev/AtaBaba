from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve as static_serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('family.urls')),
]

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve Vite assets and favicon
urlpatterns += [
    re_path(r'^assets/(?P<path>.*)$', static_serve,
            {'document_root': settings.FRONTEND_DIR / 'assets'}),
    path('favicon.svg', static_serve,
         {'document_root': settings.FRONTEND_DIR, 'path': 'favicon.svg'}),
]

# Catch-all: serve React SPA index.html for any non-API route
urlpatterns += [
    re_path(r'^(?!api/|admin/|media/|static/|assets/).*$',
            TemplateView.as_view(template_name='index.html')),
]
